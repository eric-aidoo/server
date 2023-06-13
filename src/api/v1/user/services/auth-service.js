import UserRepository from '../../../../database/mysql/repositories/user-repository';
import EmailService from '../../../../integrations/email/email-service';
import {
  BadRequestError,
  MissingFieldError,
  NotFoundError,
  UnauthorizedError,
} from '../../../../utils/error-responses';
import {
  compareHash,
  decrypt,
  encrypt,
  generateAccessToken,
  generateHash,
  generateOtpCode,
  generatePasswordResetLink,
  generateRefreshToken,
  sanitize,
  verifyPasswordResetLinkToken,
  verifyRefreshToken,
} from '../../../../utils/helpers';
import UserEntity from '../entities/user';

const signup = async (user) => {
  try {
    const newUser = UserEntity.create(user);
    await UserRepository.createUser(newUser);

    const emailVerificationCode = generateOtpCode();
    const fifteenMinutesExpiration = Date.now() + 15 * 60 * 1000;

    await UserRepository.updateUser({
      username: newUser.username,
      fieldToUpdate: 'email_verification_code',
      data: {
        verificationCode: emailVerificationCode,
        codeExpiration: fifteenMinutesExpiration,
      },
    });

    await EmailService.sendEmailVerificationEmail({
      emailAddress: newUser.email,
      firstName: newUser.first_name,
      verificationCode: emailVerificationCode,
    });
    const encryptedUsername = encrypt(newUser.username);
    const refreshToken = generateRefreshToken(encryptedUsername);

    await UserRepository.updateUser({
      username: newUser.username,
      fieldToUpdate: 'refresh_token',
      data: refreshToken,
    });
    const signupSuccessMessage =
      'Check your email for a confirmation code we just sent you and enter it here';
    return { signupSuccessMessage };
  } catch (error) {
    throw error;
  }
};

const verifyEmailVerificationCode = async ({ email, verificationCode }) => {
  try {
    if (!(email && verificationCode)) {
      throw new MissingFieldError('Email or verification code is required');
    }
    const user = await UserRepository.findUser(email);
    if (!user) {
      throw new UnauthorizedError('Invalid verification code');
    }
    const encryptedUsername = encrypt(user.username);
    const currentTime = Date.now();
    const verificationCodeHasExpired = currentTime >= user.email_verification_code_expiration;
    if (verificationCodeHasExpired) {
      throw new UnauthorizedError('Your verification code has expired or is no longer valid');
    }
    const verificationCodeIsValid = verificationCode === user.email_verification_code;
    if (!verificationCodeIsValid) {
      throw new BadRequestError('Invalid verification code');
    }
    await UserRepository.updateUser({
      username: user.username,
      fieldToUpdate: 'is_email_verified',
      data: true,
    });
    const accessToken = generateAccessToken(encryptedUsername);
    const refreshToken = user.refresh_token;
    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

const requestEmailVerificationCode = async (username) => {
  try {
    if (!username) {
      throw new MissingFieldError('Username is required');
    }
    const user = await UserRepository.findUser(username);
    if (!user) {
      throw new NotFoundError(`Hm. We couldn't find an account with that identity`);
    }
    const verificationCode = generateOtpCode();
    const fifteenMinutesExpiration = Date.now() + 15 * 60 * 1000;
    await UserRepository.updateUser({
      username: username,
      fieldToUpdate: 'email_verification_code',
      data: {
        verificationCode: verificationCode,
        codeExpiration: fifteenMinutesExpiration,
      },
    });
    // Set (invalidate) the is_email_verified property to "false" every
    // time email verification code is requested
    await UserRepository.updateUser({
      username: user.username,
      fieldToUpdate: 'is_email_verified',
      data: false,
    });

    await EmailService.sendEmailVerificationEmail({
      emailAddress: user.email,
      firstName: user.first_name,
      verificationCode: verificationCode,
    });
    const successMessage = 'Check your email for a confirmation code we just sent you and enter it here';
    return { successMessage };
  } catch (error) {
    throw error;
  }
};

const login = async ({ username, password }) => {
  try {
    if (!(username && password)) {
      throw new MissingFieldError('Username or password is required');
    }
    const user = await UserRepository.findUser(username);
    if (!user) {
      throw new NotFoundError(`Hm. We couldn't find an account with that identity`);
    }
    const sanitizedPassword = sanitize(password);
    const passwordIsCorrect = await compareHash(sanitizedPassword, user.password);
    if (!passwordIsCorrect) {
      throw new UnauthorizedError(`We don't recognize this sign in combination`);
    }
    const encryptedUser = encrypt(user.username);

    const accessToken = generateAccessToken(encryptedUser);
    const refreshToken = generateRefreshToken(encryptedUser);

    await UserRepository.updateUser({
      username: username,
      fieldToUpdate: 'refresh_token',
      data: refreshToken,
    });
    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

const renewAccessToken = async (refreshToken) => {
  try {
    if (!refreshToken) {
      throw new UnauthorizedError('Authorization required');
    }
    const username = verifyRefreshToken(refreshToken);
    const user = await UserRepository.findUser(username);
    if (!user) {
      throw new ForbiddenError('Request denied');
    }
    const persistedToken = user.refresh_token;
    const providedTokenIsValid = refreshToken === persistedToken;
    if (!providedTokenIsValid) {
      throw new ForbiddenError('Request denied');
    }
    const encryptedUsername = encrypt(user.username);
    const accessToken = generateAccessToken(encryptedUsername);
    return { accessToken };
  } catch (error) {
    throw error;
  }
};

const logout = async (refreshToken) => {
  try {
    if (!refreshToken) {
      throw new MissingFieldError('Refresh token is required');
    }
    // Delete refresh token from the database
    const username = verifyRefreshToken(refreshToken);
    await UserRepository.updateUser({
      username: username,
      fieldToUpdate: 'refresh_token',
      data: null,
    });
    const successMessage = 'Your password has been successfully changed';
    return { successMessage };
  } catch (error) {
    throw error;
  }
};

const requestPasswordResetLink = async (username) => {
  try {
    if (!username) {
      throw new MissingFieldError('Username is required');
    }
    const user = await UserRepository.findUser(username);
    if (!user) {
      throw new NotFoundError(`Hm. We couldn't find an account with that identity`);
    }
    const encryptedUsername = encrypt(username);
    const passwordResetLink = generatePasswordResetLink({
      email: user.email,
      username: encryptedUsername,
      password: user.password,
    });
    await EmailService.sendPasswordResetInstructionsEmail({
      emailAddress: user.email,
      firstName: user.first_name,
      passwordResetLink,
    });
    const successMessage =
      'If we find an account that matches the information you submitted, we will send password reset instructions to your email address';
    return { successMessage };
  } catch (error) {
    throw error;
  }
};

const verifyPasswordResetLink = async (passwordResetUrl) => {
  try {
    if (!passwordResetUrl) {
      throw new MissingFieldError('Password reset link is required');
    }
    const id = passwordResetUrl.split('/')[5];
    const token = passwordResetUrl.split('/')[6];
    const decryptedUsername = decrypt(id);
    const user = await UserRepository.findUser(decryptedUsername);
    if (!user) {
      throw new UnauthorizedError('Invalid password reset link');
    }
    verifyPasswordResetLinkToken({ password: user.password, extractedToken: token });
    return {
      email: user.email,
    };
  } catch (error) {
    throw error;
  }
};

const resetPassword = async ({ email, password }) => {
  try {
    if (!(email && password)) {
      throw new MissingFieldError('Email or password is required');
    }
    const user = await UserRepository.findUser(email);
    if (!user) {
      throw new NotFoundError(`Hm. We couldn't find an account with that identity`);
    }
    // Ensure that the new password hasn't been used before
    const sanitizedPassword = sanitize(password);
    const passwordHasBeenUsedBefore = compareHash(sanitizedPassword, user.password);
    if (passwordHasBeenUsedBefore) {
      throw new BadRequestError('Please use a password that has not been used previously');
    }
    const hashedPassword = generateHash(sanitizedPassword);
    await UserRepository.updateUser({
      username: user.username,
      fieldToUpdate: 'password',
      data: hashedPassword,
    });
    return await login({ username: user.username, password: hashedPassword });
  } catch (error) {
    throw error;
  }
};

export const UserAuthenticationService = {
  signup,
  login,
  logout,
  requestEmailVerificationCode,
  verifyEmailVerificationCode,
  renewAccessToken,
  requestPasswordResetLink,
  resetPassword,
  verifyPasswordResetLink,
};

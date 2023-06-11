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

    // Save the email verification code
    const currentDateAndTime = new Date();
    const FIFTEEN_MINUTES = new Date().setMinutes(currentDateAndTime + 15).toString();
    await UserRepository.updateUser({
      username: newUser.username,
      fieldToUpdate: 'email_verification_code',
      data: {
        verificationCode: emailVerificationCode,
        codeExpiration: FIFTEEN_MINUTES,
      },
    });

    // Send the email verification code to the user
    await EmailService.sendEmailVerificationEmail({
      emailAddress: newUser.email,
      firstName: newUser.first_name,
      verificationCode: emailVerificationCode,
    });

    const encryptedUsername = encrypt(newUser.username);
    const refreshToken = generateRefreshToken(encryptedUsername);

    // Save refresh token
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
    const encryptedUsername = encrypt(user.username);

    const currentTime = new Date();
    const verificationCodeHasExpired = currentTime >= new Date(user.email_verification_code_expiration);
    if (verificationCodeHasExpired) {
      throw new UnauthorizedError('Your verification code has expired or is no longer valid');
    }
    const verificationCodeIsValid = verificationCode === user.email_verification_code;
    if (!verificationCodeIsValid) {
      throw new BadRequestError('Invalid verification code');
    }
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
    const verificationCode = generateOtpCode();

    const currentDateAndTime = new Date();
    const FIFTEEN_MINUTES = new Date().setMinutes(currentDateAndTime + 15).toString();
    await UserRepository.updateUser({
      username: username,
      fieldToUpdate: 'email_verification_code',
      data: {
        verificationCode: verificationCode,
        codeExpiration: FIFTEEN_MINUTES,
      },
    });
    const user = await UserRepository.findUser(username);

    // Send the email verification code to the user
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
    // Delete refresh token
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
    const passwordResetLink = generatePasswordResetLink({
      email: user.email,
      username,
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

const verifyPasswordResetLink = async (passwordResetLink) => {
  try {
    if (!passwordResetLink) {
      throw new MissingFieldError('Password reset link is required');
    }
    const id = passwordResetLink.split('/')[2];
    const token = passwordResetLink.split('/')[3];
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

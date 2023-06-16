import config from '../../../../config';
import UserRepository from '../../../../database/mysql/repositories/user-repository';
import EmailService from '../../../../integrations/email/email-service';
import SmsService from '../../../../integrations/sms/sms-service';
import {
  BadRequestError,
  ForbiddenError,
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

/**
 * Sign up step 1 (POST /user/signup)
 */
const signup = async (user) => {
  try {
    const newUser = UserEntity.create(user);
    await UserRepository.createUser(newUser);

    const emailVerificationCode = generateOtpCode();

    await UserRepository.updateUser({
      username: newUser.username,
      fieldToUpdate: 'email_verification_code',
      data: {
        verificationCode: emailVerificationCode,
        verificationCodeExpiration: config.authentication.verificationCodeExpiration,
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
    const successMessage = 'Check your email for a confirmation code we just sent you and enter it here';
    return { successMessage };
  } catch (error) {
    throw error;
  }
};

/**
 * Sign up step 2- verify user's email address (POST /user/signup/verify-email)
 */
const verifyEmailVerificationCode = async ({ email, verificationCode }) => {
  try {
    if (!(email && verificationCode)) {
      throw new MissingFieldError('Email or verification code is required');
    }
    const user = await UserRepository.findUser(email);
    if (!user) {
      throw new UnauthorizedError(
        'User is unauthorized to perform this action based on the provided credentials',
      );
    }
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
    const successMessage = 'Your email is now verified';
    return { successMessage };
  } catch (error) {
    throw error;
  }
};

/**
 * Sign up step 3- Register phone number (POST /user/signup/register-phone-number)
 */
const registerPhoneNumber = async ({ username, countryOfResidence, phoneNumber }) => {
  try {
    const user = UserEntity.addPhoneNumber({
      username: username,
      country_of_residence: countryOfResidence,
      phone_number: phoneNumber,
    });
    const phoneVerificationCode = generateOtpCode();
    await UserRepository.updateUser({
      username: username,
      fieldToUpdate: 'phone_number',
      data: {
        phoneNumber: user.phone_number,
        verificationCode: phoneVerificationCode,
        verificationCodeExpiration: config.authentication.verificationCodeExpiration,
      },
    });
    await SmsService.sendVerificationCodeTextMessage({
      phoneNumber: user.phone_number,
      otpCode: phoneVerificationCode,
    });
    const successMessage = 'Verify your phone number by entering the verification code we just texted you';
    return { successMessage };
  } catch (error) {
    throw error;
  }
};

/**
 * Verify one-time phone verification code (POST /user/signup/verify-phone-number)
 */
const verifyPhoneNumber = async ({ username, verificationCode }) => {
  try {
    if (!(username && verificationCode)) {
      throw new MissingFieldError('Username or verification code is required');
    }
    const user = await UserRepository.findUser(username);
    if (!user) {
      throw new UnauthorizedError(
        'User is unauthorized to perform this action based on the provided credentials',
      );
    }
    const currentTime = Date.now();
    const verificationCodeHasExpired = currentTime >= user.phone_verification_code_expiration;
    if (verificationCodeHasExpired) {
      throw new UnauthorizedError('Your verification code has expired or is no longer valid');
    }
    const verificationCodeIsValid = verificationCode === user.phone_verification_code;
    if (!verificationCodeIsValid) {
      throw new BadRequestError('Invalid verification code');
    }
    const encryptedUsername = encrypt(username);
    await UserRepository.updateUser({
      username: user.username,
      fieldToUpdate: 'is_phone_verified',
      data: true,
    });
    const accessToken = generateAccessToken(encryptedUsername);
    const refreshToken = user.refresh_token;
    const successMessage = 'Your phone number is now verified';
    return { accessToken, refreshToken, successMessage };
  } catch (error) {
    throw error;
  }
};

/**
 * Request for verification code (POST /user/request-email-verification-code)
 */
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
    await UserRepository.updateUser({
      username: username,
      fieldToUpdate: 'email_verification_code',
      data: {
        verificationCode: verificationCode,
        codeExpiration: config.authentication.verificationCodeExpiration,
      },
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

/**
 * Login service (POST /user/login)
 */
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

/**
 * Refresh or renew access token when it expires (GET /user/renew-access-token)
 */
const renewAccessToken = async (cookies) => {
  try {
    if (!cookies?.jwt) {
      throw new UnauthorizedError('Unauthorized request');
    }
    const refreshToken = cookies.jwt;
    const username = await verifyRefreshToken(refreshToken);
    const decryptedUser = decrypt(username);
    const user = await UserRepository.findUser(decryptedUser);
    if (!user) {
      throw new ForbiddenError('Your request was denied');
    }
    const providedTokenIsValid = refreshToken === user.refresh_token;
    if (!providedTokenIsValid) {
      throw new ForbiddenError('Your request was denied');
    }
    const encryptedUsername = encrypt(user.username);
    const accessToken = generateAccessToken(encryptedUsername);
    return { accessToken };
  } catch (error) {
    throw error;
  }
};

/**
 * Request password reset instructions (POST /user/forgot-password)
 */
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

/**
 * Verify password reset link. This is where the user visits the link and we
 * display the password reset page when valid (GET /user/reset-password/:id/:token)
 */
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

/**
 * Reset password. This is when the user actually changing the password (POST /user/reset-password)
 */
const resetPassword = async ({ email, password }) => {
  try {
    if (!(email && password)) {
      throw new MissingFieldError('Email or password is required');
    }
    const user = await UserRepository.findUser(email);
    if (!user) {
      throw new NotFoundError(`Hm. We couldn't find an account with that identity`);
    }
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

/**
 * logout service (POST /user/logout)
 */
const logout = async (cookies) => {
  try {
    if (!cookies?.jwt) {
      throw new UnauthorizedError(
        `Cookies are required to perform this action. Please ensure cookies are enabled and retry.`,
      );
    }
    const refreshToken = cookies.jwt;
    const username = await verifyRefreshToken(refreshToken);
    const decryptedUsername = decrypt(username);
    await UserRepository.updateUser({
      username: decryptedUsername,
      fieldToUpdate: 'refresh_token',
      data: null,
    });
    const successMessage = `You've successfully logged out, and all your account settings have been reset to default values`;
    return { successMessage };
  } catch (error) {
    throw error;
  }
};

export const UserAuthenticationService = {
  signup,
  registerPhoneNumber,
  verifyPhoneNumber,
  login,
  logout,
  requestEmailVerificationCode,
  verifyEmailVerificationCode,
  renewAccessToken,
  requestPasswordResetLink,
  resetPassword,
  verifyPasswordResetLink,
};

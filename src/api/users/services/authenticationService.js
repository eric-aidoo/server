import config from '../../../config/appConfig';
import { ForbiddenError, MissingFieldError, NotFoundError, UnauthorizedError } from '../../../helpers/errors';
import {
  decrypt,
  encrypt,
  generateAccessToken,
  generateHash,
  generateOtpCode,
  generatePasswordResetLink,
  generateRefreshToken,
  sanitize,
  verifyPasswordResetUrlToken,
  verifyRefreshToken,
} from '../../../helpers/utilities';
import EmailService from '../../../integrations/email/service';
import UserRepository from '../dataAccess/userRepository';
import waitlistRepository from '../dataAccess/waitlistRepository';
import UserFactory from '../factories/user';

const checkIfUserIsAllowedToTestApp = async ({ email, inviteCode }) => {
  try {
    if (!email) {
      throw new MissingFieldError('Email is required');
    }
    const waitlistUser = await waitlistRepository.findUser(email);
    if (!waitlistUser) {
      throw new NotFoundError(`Hm. Looks like you're not on the waitlist.`);
    }
    if (!inviteCode) {
      throw new MissingFieldError('Please provide your unique beta invite code');
    }
    const inviteCodeIsValid = (await waitlistUser.invite_code) === inviteCode;
    if (!inviteCodeIsValid) {
      throw new UnauthorizedError('Your invite code is invalid');
    }
    const userCanTestApp = waitlistUser.is_allowed_to_test;
    if (!userCanTestApp) {
      throw new UnauthorizedError(
        `Credet is not available for you yet. We will notify you when it's your turn. Keep an eye on your inbox.`,
      );
    }
    return {
      isAllowedToTestApp: true,
    };
  } catch (error) {
    throw error;
  }
};

const signup = async (signupDetails) => {
  try {
    // await checkIfUserIsAllowedToTestApp({
    //   email: signupDetails.email,
    //   inviteCode: signupDetails.invite_code,
    // });
    const newlyCreatedUser = UserFactory.createUser(signupDetails);

    // const propertiesToExclude = ['invite_code'];
    // const userObjectWithoutInviteCode = Object.fromEntries(
    //   Object.entries(newlyCreatedUser).filter(([property]) => !propertiesToExclude.includes(property)),
    // );
    // await UserRepository.addUser(userObjectWithoutInviteCode);
    await UserRepository.addUser(newlyCreatedUser);
    const emailVerificationCode = generateOtpCode();
    console.log(emailVerificationCode);

    await UserRepository.updateEmailVerificationCode({
      username: newlyCreatedUser.username,
      verificationCode: emailVerificationCode,
      codeExpiration: config.authentication.verificationCodeExpiration,
    });

    await EmailService.sendEmailVerificationCode({
      recipient: newlyCreatedUser.email,
      firstName: newlyCreatedUser.first_name,
      verificationCode: emailVerificationCode,
    });
    return {
      response: 'Check your email for a confirmation code we just sent you and enter it here',
    };
  } catch (error) {
    throw error;
  }
};

const verifyEmailVerificationCode = async ({ email, verificationCode }) => {
  try {
    if (!email) {
      throw new MissingFieldError('Email is required');
    }
    if (!verificationCode) {
      throw new MissingFieldError('Verification code is required');
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
      throw new UnauthorizedError('Your verification code is no longer valid or has expired');
    }
    const verificationCodeIsValid = verificationCode === user.email_verification_code;
    if (!verificationCodeIsValid) {
      throw new UnauthorizedError('Invalid verification code');
    }
    const encryptedUsername = encrypt(user.username);

    const refreshToken = generateRefreshToken(encryptedUsername);
    const accessToken = generateAccessToken(encryptedUsername);

    await UserRepository.updateRefreshToken({
      username: user.username,
      refreshToken: refreshToken,
    });
    // await EmailService.sendWelcomeEmail();
    return { refreshToken, accessToken };
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
    const encryptedUsername = encrypt(user.username);

    const accessToken = generateAccessToken(encryptedUsername);
    const refreshToken = generateRefreshToken(encryptedUsername);

    await UserRepository.updateRefreshToken({
      username: username,
      refreshToken: refreshToken,
    });
    await EmailService.sendLoginActivityReport();
    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

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
      throw new ForbiddenError('Request denied');
    }
    const providedTokenIsValid = refreshToken === user.refresh_token;
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

/**
 * This is the first step of the password reset process.
 */
const requestPasswordResetUrl = async (username) => {
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

    await EmailService.sendPasswordResetInstructions({
      recipient: user.email,
      firstName: user.first_name,
      passwordResetLink,
    });
    return {
      response:
        'If we find an account that matches the information you submitted, we will send password reset instructions to your email address',
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Step 2 of password reset process. Upon visiting password reset url,
 * we verify the reset link to make sure its valid and has the right bearer
 */
const verifyPasswordResetUrl = async (passwordResetUrl) => {
  try {
    if (!passwordResetUrl) {
      throw new MissingFieldError('Password reset link is required');
    }
    const urlIdentifier = passwordResetUrl.split('/')[5];
    const urlToken = passwordResetUrl.split('/')[6];
    const decryptedUsername = decrypt(urlIdentifier);
    const user = await UserRepository.findUser(decryptedUsername);
    if (!user) {
      throw new UnauthorizedError('Invalid password reset link');
    }
    verifyPasswordResetUrlToken({ password: user.password, extractedToken: urlToken });
    return {
      email: user.email,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Step 3 (last step) of password reset process. This is when the user
 * actually changes his/her password
 */
const resetPassword = async ({ username, password }) => {
  try {
    if (!(username && password)) {
      throw new MissingFieldError('Username and password are both required');
    }
    const user = await UserRepository.findUser(username);
    if (!user) {
      throw new NotFoundError(`Hm. We couldn't find an account with that identity`);
    }
    const sanitizedPassword = sanitize(password);
    const passwordHasBeenUsedBefore = compareHash(sanitizedPassword, user.password);
    if (passwordHasBeenUsedBefore) {
      throw new BadRequestError('Please use a password that has not been used previously');
    }
    const newPassword = generateHash(sanitizedPassword);
    await UserRepository.updatePassword({
      username: username,
      password: newPassword,
    });
    await login({
      username: user.username,
      password: newPassword,
    });
  } catch (error) {
    throw error;
  }
};

const signOut = async (cookies) => {
  try {
    if (!cookies?.jwt) {
      throw new UnauthorizedError(
        `Cookies are required to perform this action. Please ensure cookies are enabled and retry request.`,
      );
    }
    const refreshToken = cookies.jwt;
    const username = await verifyRefreshToken(refreshToken);
    const decryptedUsername = decrypt(username);

    // We're clearing or nullifying any refresh token upon logout requests.
    // The client must also delete the refresh token
    await UserRepository.updateRefreshToken({
      username: decryptedUsername,
      refreshToken: null,
    });
    return {
      response: `You're now signed out`,
    };
  } catch (error) {
    throw error;
  }
};

const UserAuthService = {
  signup,
  verifyEmailVerificationCode,
  login,
  renewAccessToken,
  requestPasswordResetUrl,
  verifyPasswordResetUrl,
  resetPassword,
  signOut,
};

export default UserAuthService;

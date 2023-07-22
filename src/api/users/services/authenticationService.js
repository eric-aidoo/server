import config from '../../../config/appConfig';
import { MissingFieldError, NotFoundError, UnauthorizedError } from '../../../helpers/errors';
import { generateOtpCode } from '../../../helpers/utilities';
import EmailService from '../../../integrations/email/service';
import userRepository from '../dataAccess/userRepository';
import waitlistRepository from '../dataAccess/waitlistRepository';
import UserFactory from '../factories/user';

/**
 * Check if user is allowed to access the app
 * @param {string} email
 * @param {string} inviteCode
 * @returns true or false, indicating the user's accessibility
 * to the service
 */
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

/**
 * During our beta phase, users will be required to provide
 * their invite code in order to create an account. This requirement
 * will be removed once app becomes publicly available
 * @param {object} signupDetails
 */
const signup = async (signupDetails) => {
  try {
    await checkIfUserIsAllowedToTestApp({
      email: signupDetails.email,
      inviteCode: signupDetails.invite_code,
    });
    const newlyCreatedUser = UserFactory.createUser(signup);

    const propertiesToExclude = ['invite_code'];
    const userObjectWithoutInviteCode = Object.fromEntries(
      Object.entries(newlyCreatedUser).filter(([property]) => !propertiesToExclude.includes(property)),
    );
    await userRepository.addUser(userObjectWithoutInviteCode);
    const emailVerificationCode = generateOtpCode();

    await userRepository.updateEmailVerificationCode({
      username: newlyCreatedUser.username,
      verificationCode: emailVerificationCode,
      codeExpiration: config.authentication.verificationCodeExpiration,
    });

    await EmailService.requestAnEmailVerification({
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
    if (!(email && verificationCode)) {
      throw new MissingFieldError('Email or verification code is required');
    }
    const user = userRepository.findUser(email);
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
      throw new BadRequestError('Invalid verification code');
    }
  } catch (error) {
    throw error;
  }
};

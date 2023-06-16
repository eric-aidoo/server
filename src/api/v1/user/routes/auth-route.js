import asyncHandler from '../../../../middleware/async-handler';
import limitLoginAttempts from '../../../../middleware/login-limiter';
import verifyAccessToken from '../../../../middleware/verify-access-token';
import { expressWrapper } from '../../../../utils/helpers';
import { authController } from '../controllers/auth-controller';

/**
 * Signup step 1 of 4
 */
const signupRequest = {
  method: 'POST',
  path: '/user/signup',
  controller: asyncHandler(authController.signup),
};

/**
 * Signup step 2 of 4
 */
const emailVerificationRequest = {
  method: 'POST',
  path: '/user/signup/verify-email',
  controller: asyncHandler(authController.verifyEmail),
};

/**
 * Signup step 3 of 4
 */
const registerPhoneNumberRequest = {
  method: 'POST',
  path: '/user/signup/register-phone-number',
  controller: asyncHandler(authController.registerPhoneNumber),
};

/**
 * Signup step 4 of 4
 */
const verifyPhoneNumberRequest = {
  method: 'POST',
  path: '/user/signup/verify-phone-number',
  controller: asyncHandler(authController.verifyPhoneNumber),
};

/**
 * Login request
 */
const loginRequest = {
  method: 'POST',
  path: '/user/login',
  middleware: [limitLoginAttempts],
  controller: asyncHandler(authController.login),
};

/**
 * Request for email verification code request
 */
const emailVerificationCodeRequest = {
  method: 'POST',
  path: '/user/request-email-verification-code',
  controller: asyncHandler(authController.requestEmailVerificationCode),
};

/**
 * Request for password reset link/instructions request (password reset step 1 of 3)
 */
const passwordResetInstructionsRequest = {
  method: 'POST',
  path: '/user/forgot-password',
  controller: asyncHandler(authController.requestPasswordResetLink),
};

/**
 * Verify password reset link request (password reset step 2 of 3)
 */
const getPasswordResetPageRequest = {
  method: 'GET',
  path: '/user/reset-password/:id/:token',
  controller: asyncHandler(authController.getPasswordResetPage),
};

/**
 * Change password request (password reset step 3 of 3)
 */
const changePasswordRequest = {
  method: 'POST',
  path: '/user/reset-password',
  controller: asyncHandler(authController.resetPassword),
};

/**
 * Renew access token request
 */
const renewAccessTokenRequest = {
  method: 'GET',
  path: '/user/renew-access-token',
  controller: asyncHandler(authController.renewAccessToken),
};

/**
 * Signout request
 */
const logoutRequest = {
  method: 'POST',
  path: '/user/logout',
  controller: asyncHandler(authController.logout),
};

const testRoute = {
  method: 'GET',
  path: '/get-users',
  middleware: [verifyAccessToken],
  controller: async (req, res) => {
    const users = [
      {
        id: '123xyz',
        age: 22,
        name: 'Eric Aidoo',
      },
      {
        id: '456abc',
        age: 21,
        name: 'John Smith',
      },
    ];
    res.status(200).json(users);
  },
};

const register = async (server) => {
  const incomingRequests = expressWrapper(server);
  incomingRequests.route([
    signupRequest,
    emailVerificationRequest,
    registerPhoneNumberRequest,
    verifyPhoneNumberRequest,
    loginRequest,
    emailVerificationCodeRequest,
    passwordResetInstructionsRequest,
    getPasswordResetPageRequest,
    changePasswordRequest,
    renewAccessTokenRequest,
    logoutRequest,
    testRoute,
  ]);
};

const userAuthenticationRoutes = {
  register,
};

export default userAuthenticationRoutes;

import asyncHandler from '../../../../middleware/async-handler';
import { expressWrapper } from '../../../../utils/helpers';
import { authController } from '../controllers/auth-controller';

// async function register(server) {
//   const request = expressWrapper(server);

const signupRequest = {
  method: 'POST',
  path: '/user/signup',
  controller: asyncHandler(authController.signup),
};

const emailVerificationRequest = {
  method: 'POST',
  path: '/user/verify-email',
  controller: asyncHandler(authController.verifyEmail),
};

const loginRequest = {
  method: 'POST',
  path: '/user/login',
  controller: asyncHandler(authController.login),
};

const emailVerificationCodeRequest = {
  method: 'POST',
  path: '/user/email/request-verification-code',
  controller: asyncHandler(authController.requestEmailVerificationCode),
};

// This is the route for when user clicks on "forgot password?"
const passwordResetInstructionsRequest = {
  method: 'POST',
  path: '/user/forgot-password',
  controller: asyncHandler(authController.requestPasswordResetLink),
};

const getPasswordResetPageRequest = {
  method: 'GET',
  path: '/user/reset-password/:id/:token',
  controller: asyncHandler(authController.getPasswordResetPage),
};

const changePasswordRequest = {
  method: 'POST',
  path: '/user/reset-password',
  controller: asyncHandler(authController.resetPassword),
};

const renewAccessTokenRequest = {
  method: 'POST',
  path: '/user/renew-access-token',
  controller: asyncHandler(authController.renewAccessToken),
};

const logoutRequest = {
  method: 'POST',
  path: '/user/logout',
  controller: asyncHandler(authController.logout),
};

const register = async (server) => {
  const incomingRequests = expressWrapper(server);
  incomingRequests.route([
    signupRequest,
    emailVerificationRequest,
    loginRequest,
    emailVerificationCodeRequest,
    passwordResetInstructionsRequest,
    getPasswordResetPageRequest,
    changePasswordRequest,
    renewAccessTokenRequest,
    logoutRequest,
  ]);
};

const userAuthenticationRoutes = {
  register,
};

export default userAuthenticationRoutes;

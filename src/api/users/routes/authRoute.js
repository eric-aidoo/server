import { expressWrapper } from '../../../helpers/utilities';
import asyncHandler from '../../../middleware/asyncHandler';
import limitLoginAttempts from '../../../middleware/loginLimiter';
import authController from '../controllers/authController';

// Signup step 1 of 2
const signupStepOneRequest = {
  method: 'POST',
  path: '/user/signup',
  controller: asyncHandler(authController.signup),
};

// Signup step 2 of 2 (POST /user/signup/verify-email)
const signupStepTwoRequest = {
  method: 'POST',
  path: '/user/signup/verify-email',
  controller: asyncHandler(authController.verifyEmailVerificationCode),
};

// Request an email verification code (POST /user/email/request-verification-code)
const requestEmailVerificationCodeRequest = {
  method: 'POST',
  path: '/user/email/request-verification-code',
  controller: asyncHandler(authController.requestAnEmailVerificationCode),
};

// Login route (POST /user/login)
const loginRequest = {
  method: 'POST',
  path: '/user/login',
  controller: asyncHandler(authController.login),
};

// middleware: [limitLoginAttempts],

const register = async (server) => {
  const incomingRequests = expressWrapper(server);
  incomingRequests.route([
    signupStepOneRequest,
    signupStepTwoRequest,
    requestEmailVerificationCodeRequest,
    loginRequest,
  ]);
};

const userAuthenticationRoutes = {
  register,
};

export default userAuthenticationRoutes;

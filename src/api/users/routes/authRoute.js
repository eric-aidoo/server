import { expressWrapper } from '../../../helpers/utilities';
import asyncHandler from '../../../middleware/asyncHandler';
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

const register = async (server) => {
  const incomingRequests = expressWrapper(server);
  incomingRequests.route([signupStepOneRequest, signupStepTwoRequest]);
};

const userAuthenticationRoutes = {
  register,
};

export default userAuthenticationRoutes;

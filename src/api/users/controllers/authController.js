import UserAuthService from '../services/authenticationService';

const signup = async (req, res) => {
  const user = req.body;
  const feedback = await UserAuthService.signup(user);
  return res.status(201).json({
    message: feedback.response,
  });
};

const verifyEmailVerificationCode = async (req, res) => {
  const { email, verification_code } = req.body;

  const feedback = await UserAuthService.verifyEmailVerificationCode({
    email: email,
    verificationCode: verification_code,
  });
  return res.status(200).json({
    access_token: feedback.accessToken,
    refresh_token: feedback.refreshToken,
  });
};

const requestAnEmailVerificationCode = async (req, res) => {
  const email = req.body;
  const feedback = await UserAuthService.requestAnEmailVerificationCode(email);
  return res.status(200).json({
    message: feedback.response,
  });
};

const authController = {
  signup,
  verifyEmailVerificationCode,
  requestAnEmailVerificationCode,
};

export default authController;

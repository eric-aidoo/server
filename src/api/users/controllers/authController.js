import UserAuthService from '../services/authenticationService';

const signup = async (req, res) => {
  const user = req.body;
  const feedback = await UserAuthService.signup(user);
  return res.status(201).json({
    success: true,
    data: {
      message: feedback.response,
    },
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

const authController = {
  signup,
  verifyEmailVerificationCode,
};

export default authController;

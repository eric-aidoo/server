import { setCookie } from '../../../helpers/utilities';
import EmailService from '../../../integrations/email';
import getLoginActivityReport from '../../../middleware/getLoginActivityReport';
import UserAuthService from '../services/authService';

const signup = async (req, res) => {
  const user = req.body;
  const feedback = await UserAuthService.signup(user);
  return res.status(201).json({
    success: true,
    message: feedback.response,
  });
};

const verifyEmailVerificationCode = async (req, res) => {
  const { email, verification_code } = req.body;

  const feedback = await UserAuthService.verifyEmailVerificationCode({
    email: email,
    verificationCode: verification_code,
  });
  setCookie({
    responseObject: res,
    cookieName: 'jwt',
    refreshToken: feedback.refreshToken,
  });
  return res.status(200).json({
    success: true,
    message: 'Your email is now verified',
    access_token: feedback.accessToken,
  });
};

const requestAnEmailVerificationCode = async (req, res) => {
  const email = req.body;
  const feedback = await UserAuthService.requestAnEmailVerificationCode(email);
  return res.status(200).json({
    success: true,
    message: feedback.response,
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const feedback = await UserAuthService.login({
    username,
    password,
  });

  setCookie({
    responseObject: res,
    cookieName: 'jwt',
    refreshToken: feedback.refreshToken,
  });
  // Send a login activity report to the user
  const loginActivity = await getLoginActivityReport(req);
  EmailService.sendLoginActivityReportEmail({
    recipient: feedback.email,
    firstName: feedback.firstName,
    device: loginActivity.deviceId,
    location: loginActivity.approximateLocation,
    loginUrl: 'https://account.credetpay.com/login',
    timestamp: loginActivity.timeOfLogin,
  });
  return res.status(200).json({
    success: true,
    access_token: feedback.accessToken,
  });
};

const authController = {
  signup,
  verifyEmailVerificationCode,
  requestAnEmailVerificationCode,
  login,
};

export default authController;

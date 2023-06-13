import config from '../../../../config';
import { UserAuthenticationService } from '../services/auth-service';

const signup = async (req, res) => {
  const user = req.body;
  const feedback = await UserAuthenticationService.signup(user);
  return res.status(201).json({
    success: true,
    api_version: config.api.version,
    data: {
      message: feedback.signupSuccessMessage,
    },
  });
};

const verifyEmail = async (req, res) => {
  const { email, verification_code } = req.body;
  const feedback = await UserAuthenticationService.verifyEmailVerificationCode({
    email,
    verificationCode: verification_code,
  });
  return res.status(200).json({
    success: true,
    api_version: config.api.version,
    data: {
      access_token: feedback.accessToken,
      refresh_token: feedback.refreshToken,
    },
  });
};

const login = async (req, res) => {
  const { username, email, password } = req.body;
  const feedback = await UserAuthenticationService.login({ username: username || email, password });
  return res.status(200).json({
    success: true,
    api_version: config.api.version,
    data: {
      access_token: feedback.accessToken,
      refresh_token: feedback.refreshToken,
    },
  });
};

const requestEmailVerificationCode = async (req, res) => {
  const { username } = req.body;
  const feedback = await UserAuthenticationService.requestEmailVerificationCode(username);
  return res.status(200).json({
    success: true,
    api_version: config.api.version,
    data: {
      message: feedback.successMessage,
    },
  });
};

const renewAccessToken = async (req, res) => {
  const { refresh_token } = req.body;
  const feedback = await UserAuthenticationService.renewAccessToken(refresh_token);
  return res.status(200).json({
    success: true,
    api_version: config.api.version,
    data: {
      access_token: feedback.accessToken,
    },
  });
};

const requestPasswordResetLink = async (req, res) => {
  const { username } = req.body;
  const feedback = await UserAuthenticationService.requestPasswordResetLink(username);
  return res.status(200).json({
    success: true,
    api_version: config.api.version,
    data: {
      message: feedback.successMessage,
    },
  });
};

const getPasswordResetPage = async (req, res) => {
  const passwordResetUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const { email } = await UserAuthenticationService.verifyPasswordResetLink(passwordResetUrl);
  return res.status(200).render('reset-password.ejs', { email: email });
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  const { accessToken, refreshToken } = await UserAuthenticationService.resetPassword({ email, password });
  return res.status(200).json({
    success: true,
    api_version: config.api.version,
    data: {
      access_token: accessToken,
      refresh_token: refreshToken,
    },
  });
};

const logout = async (req, res) => {
  const { refresh_token } = req.body;
  const feedback = await UserAuthenticationService.logout({ refresh_token });
  return res.status(200).json({
    success: true,
    api_version: config.api.version,
    data: {
      logout_message: feedback.successMessage,
    },
  });
};

export const authController = {
  signup,
  verifyEmail,
  login,
  renewAccessToken,
  requestPasswordResetLink,
  getPasswordResetPage,
  requestEmailVerificationCode,
  resetPassword,
  logout,
};

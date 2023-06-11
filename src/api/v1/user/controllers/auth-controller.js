import { UserAuthenticationService } from '../services/authentication-service';

const signup = async (req, res) => {
  const user = req.body;
  const feedback = await UserAuthenticationService.signup(user);
  res.status(201).json({
    success: true,
    data: {
      message: feedback.signupSuccessMessage,
    },
  });
};

const verifyEmail = async (req, res) => {
  const { email, email_verification_code } = req.body;
  const feedback = await UserAuthenticationService.verifyEmailVerificationCode({
    email,
    verificationCode: email_verification_code,
  });
  res.status(200).json({
    success: true,
    data: {
      access_token: feedback.accessToken,
      refresh_token: feedback.refreshToken,
    },
  });
};

const login = async (req, res) => {
  const { username, email, password } = req.body;
  const feedback = await UserAuthenticationService.login({ username: username || email, password });
  res.status(200).json({
    success: true,
    data: {
      access_token: feedback.accessToken,
      refresh_token: feedback.refreshToken,
    },
  });
};

const renewAccessToken = async (req, res) => {
  const { refresh_token } = req.body;
  const feedback = await UserAuthenticationService.renewAccessToken(refresh_token);
  res.status(200).json({
    success: true,
    data: {
      access_token: feedback.accessToken,
    },
  });
};

const requestPasswordReset = async (req, res) => {
  const { username } = req.body;
  const feedback = await UserAuthenticationService.requestPasswordResetLink(username);
  res.status(200).json({
    success: true,
    data: {
      message: feedback.successMessage,
    },
  });
};

const getPasswordResetPage = async (req, res) => {
  const passwordResetUrl = req.url;
  const { email } = await UserAuthenticationService.verifyPasswordResetLink(passwordResetUrl);
  res.status(200).render('reset-password.ejs', { email });
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  const { accessToken, refreshToken } = await UserAuthenticationService.resetPassword({ email, password });
  res.status(200).json({
    success: true,
    data: {
      access_token: accessToken,
      refresh_token: refreshToken,
    },
  });
};

const logout = async (req, res) => {
  const { refresh_token } = req.body;
  const feedback = await UserAuthenticationService.logout(refresh_token);
  res.status(200).json({
    success: true,
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
  requestPasswordReset,
  getPasswordResetPage,
  resetPassword,
  logout,
};

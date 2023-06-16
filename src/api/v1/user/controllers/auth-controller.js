import config from '../../../../config';
import { UnauthorizedError } from '../../../../utils/error-responses';
import { deleteCookie, setCookie } from '../../../../utils/helpers';
import { UserAuthenticationService } from '../services/auth-service';

/**
 * Signup controller - step 1
 * @returns Signup success message
 */
const signup = async (req, res) => {
  const user = req.body;
  const feedback = await UserAuthenticationService.signup(user);
  return res.status(201).json({
    success: true,
    api_version: config.api.version,
    data: {
      message: feedback.successMessage,
    },
  });
};

/**
 * Signup controller - step 2
 * @returns a verified email success message
 */
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
      message: feedback.successMessage,
    },
  });
};

/**
 * Signup controller - step 3
 * @returns a success message telling the user a phone verification
 * code has been sent.
 */
const registerPhoneNumber = async (req, res) => {
  const { username, country_of_residence, phone_number } = req.body;
  const feedback = await UserAuthenticationService.registerPhoneNumber({
    username: username,
    countryOfResidence: country_of_residence,
    phoneNumber: phone_number,
  });
  return res.status(201).json({
    success: true,
    api_version: config.api.version,
    data: {
      message: feedback.successMessage,
    },
  });
};

/**
 * Signup controller - step 4
 * @returns a verified phone success message and access token
 */
const verifyPhoneNumber = async (req, res) => {
  const { username, verification_code } = req.body;
  const feedback = await UserAuthenticationService.verifyPhoneNumber({
    username: username,
    verificationCode: verification_code,
  });
  setCookie({
    responseObject: res,
    cookieName: 'jwt',
    refreshToken: feedback.refreshToken,
  });
  return res.status(200).json({
    success: true,
    api_version: config.api.version,
    data: {
      message: feedback.successMessage,
      access_token: feedback.accessToken,
    },
  });
};

/**
 * Login controller
 * @returns an access token
 */
const login = async (req, res) => {
  const { username, email, password } = req.body;
  const feedback = await UserAuthenticationService.login({ username: username || email, password });
  setCookie({
    responseObject: res,
    cookieName: 'jwt',
    refreshToken: feedback.refreshToken,
  });
  return res.status(200).json({
    success: true,
    api_version: config.api.version,
    data: {
      access_token: feedback.accessToken,
    },
  });
};

/**
 * Request for email verification code controller
 * @returns an email containing an expirable ont-time verification code
 */
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

/**
 * Refresh access token controller
 * @returns a renewed access token
 */
const renewAccessToken = async (req, res) => {
  const cookies = req.cookies;
  const feedback = await UserAuthenticationService.renewAccessToken(cookies);
  return res.status(200).json({
    success: true,
    api_version: config.api.version,
    data: {
      access_token: feedback.accessToken,
    },
  });
};

/**
 * Request for password reset link controller
 * @returns sends a password reset url in a form of email to the user
 * to reset their password
 */
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

/**
 * Password reset page controller
 * @returns a password reset page for the user to change password
 */
const getPasswordResetPage = async (req, res) => {
  const passwordResetUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const { email } = await UserAuthenticationService.verifyPasswordResetLink(passwordResetUrl);
  return res.status(200).render('reset-password.ejs', { email: email });
};

/**
 * Password change controller
 * @returns a new access token
 */
const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  const feedback = await UserAuthenticationService.resetPassword({ email, password });
  setCookie({
    responseObject: res,
    cookieName: 'jwt',
    refreshToken: feedback.refreshToken,
  });
  return res.status(200).json({
    success: true,
    api_version: config.api.version,
    data: {
      access_token: feedback.accessToken,
    },
  });
};

/**
 * Logout controller- it's set up in a way that prevents subsequent logout requests
 * after a first successful logout request
 * @returns a logout success message
 */
let loggedOut = false;

const logout = async (req, res, next) => {
  const clientIsAlreadyLoggedOut = req.session.loggedOut;
  if (clientIsAlreadyLoggedOut) {
    return next(new UnauthorizedError('You are already logged out'));
  }
  const cookies = req.cookies;
  const feedback = await UserAuthenticationService.logout(cookies);
  deleteCookie({
    responseObject: res,
    cookieName: 'jwt',
  });
  return res.status(200).json({
    success: true,
    api_version: config.api.version,
    data: {
      message: feedback.successMessage,
    },
  });
};

export const authController = {
  signup,
  verifyEmail,
  registerPhoneNumber,
  verifyPhoneNumber,
  login,
  renewAccessToken,
  requestPasswordResetLink,
  getPasswordResetPage,
  requestEmailVerificationCode,
  resetPassword,
  logout,
};

import config from '../config/appConfig';
import libraries from '../helpers/libraries';

const limitLoginAttempts = libraries.rateLimit({
  windowMs: config.authentication.loginRetryWindow,
  max: config.authentication.loginAttemptsPerWindow,

  message: {
    error: {
      code: 'too_many_requests',
      message:
        'This account is temporarily locked due to too many failed login attempts. Please wait a few moments then try again',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default limitLoginAttempts;

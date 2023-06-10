import libraries from '../utils/libraries';
import config from '../config';

const limitLoginAttempts = libraries.rateLimit({
  windowMs: config.authentication.loginRetryWindow,
  max: config.authentication.loginAttemptsPerWindow,
  message: 'Too many login attempts. Please try again later after 3 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
});

export default limitLoginAttempts;

import libraries from '../utils/libraries';
import config from '../settings/config';

const requestLimiter = libraries.rateLimit({
  windowMs: config.api.requests.retryWindow,
  max: config.api.requests.attemptsPerWindow,
  message: {
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Too many requests, please try again later.',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default requestLimiter;

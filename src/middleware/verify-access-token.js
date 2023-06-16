import config from '../config';
import { ForbiddenError, UnauthorizedError } from '../utils/error-responses';
import { getBearerToken } from '../utils/helpers';
import libraries from '../utils/libraries';

const verifyAccessToken = (req, res, next) => {
  const authorizationHeader = req.headers?.authorization || req.headers?.['authorization'];
  if (!authorizationHeader) {
    return next(new UnauthorizedError('Authorization required'));
  }
  const token = getBearerToken(authorizationHeader);
  libraries.jwt.verify(token, config.oAuth.accessTokenSecret, (error, payload) => {
    if (error) {
      const errorMessage =
        error.name === 'TokenExpiredError' ? 'Invalid or expired token' : 'Your request was denied';
      return next(new ForbiddenError(errorMessage));
    }
    req.user = payload.username;
    next();
  });
};

export default verifyAccessToken;

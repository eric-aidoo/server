import { ForbiddenError, UnauthorizedError } from '../utils/error-responses';
import { getBearerToken } from '../utils/helpers';

const verifyAccessToken = (req, res, next) => {
  const authorizationHeader = req.headers?.authorization || req.headers?.['authorization'];
  if (!authorizationHeader) {
    return next(new UnauthorizedError('Authorization required'));
  }
  const token = getBearerToken(authorizationHeader);
  jwt.verify(token, config.oAuth.accessTokenSecret, (error, payload) => {
    if (error) {
      return next(new ForbiddenError('Request denied'));
    }
    req.payload = payload.username;
    next();
  });
};

export default verifyAccessToken;

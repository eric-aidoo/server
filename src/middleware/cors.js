import config from '../settings';

export const corsMiddleware = (req, res, next) => {
  const serverIsInDevMode = config.server.appEnvironment === 'development';
  if (serverIsInDevMode) {
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, User-Agent, Content-Type, Accept, Authorization, If-Modified-Since, Cache-Control, Referer',
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    return next();
  }
  const server = config.server;
  const origin = req.headers.origin;
  if (!server.allowedOrigins.includes(origin)) {
    throw new ForbiddenError('Request denied');
  }
  res.setHeader('Access-Control-Allow-Headers', server.allowedHeaders.join(', '));
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', origin);
  next();
};

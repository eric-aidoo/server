import path from 'path';
import crypto from 'crypto';
import {
  contentSecurityPolicyMiddleware,
  expectCTMiddleware,
  featurePolicyMiddleware,
  xFrameOptionMiddleware,
} from './middleware/securityHeaders';
import errorHandler from './middleware/errorHandler';
import libraries from './helpers/libraries';
import requestLimiter from './middleware/rateLimiter';
import corsMiddleware from './middleware/cors';
import handleUnspecifiedRouteRequests from './middleware/handleUnidentifiedRoutes';
import { deactivateDebuggingInProductionMode, generateFingerprint } from './helpers/utilities';

export default async function createApplication(webserver) {
  deactivateDebuggingInProductionMode();

  // These are security headers
  webserver.disable('x-powered-by');
  webserver.disable('server');
  webserver.disable('etag');
  webserver.disable('x-xss-protection');
  webserver.set('x-dns-prefetch-control', 'off');
  webserver.use(libraries.helmet());
  webserver.use(xFrameOptionMiddleware);
  webserver.use(contentSecurityPolicyMiddleware);
  webserver.use(expectCTMiddleware);
  webserver.use(featurePolicyMiddleware);
  webserver.use(corsMiddleware);
  webserver.set('trust proxy', true);

  // Other express middleware
  webserver.use(libraries.expressFramework.urlencoded({ extended: true }));
  webserver.use(libraries.expressFramework.json({ limit: '50mb' }));
  webserver.use(libraries.compression());
  webserver.use(libraries.cookieParser());
  webserver.use(libraries.expressFramework.static(path.join(process.cwd(), 'src', 'public')));
  webserver.set('views', path.join(process.cwd(), 'src', 'views'));

  webserver.use(requestLimiter);

  webserver.get('/', (req, res) => {
    res.status(200).json({
      success: true,
      data: {
        message: 'Welcone to Credet payment APIs',
      },
    });
  });

  webserver.get('/ip', (req, res) => {
    const ipAddress = req.ip;
    res.send(`Your IP address: ${ipAddress}`);
  });

  // Handle requests to unspecified routes
  webserver.all('*', handleUnspecifiedRouteRequests);

  webserver.use(errorHandler);

  return webserver;
}

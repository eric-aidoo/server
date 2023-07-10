import path from 'path';
import crypto from 'crypto';
import {
  contentSecurityPolicyMiddleware,
  expectCTMiddleware,
  featurePolicyMiddleware,
  xFrameOptionMiddleware,
} from './middleware/security-headers';
import errorHandler from './middleware/error-handler';
import { deactivateDebuggingInProductionMode, encrypt, reformatResponse } from './utils/helpers';

import libraries from './utils/libraries';
import requestLimiter from './middleware/rate-limiter';
import corsMiddleware from './middleware/cors';
import handleUnspecifiedRouteRequests from './middleware/unspecified-route-handler';

export default async function createExpressApp() {
  const app = libraries.expressFramework();

  /**
   * These are security headers
   */
  app.disable('x-powered-by');
  app.disable('server');
  app.disable('etag');
  app.disable('x-xss-protection');
  app.set('trust proxy', true);
  app.set('x-dns-prefetch-control', 'off');
  app.use(libraries.helmet());
  app.use(xFrameOptionMiddleware);
  app.use(contentSecurityPolicyMiddleware);
  app.use(expectCTMiddleware);
  app.use(featurePolicyMiddleware);
  app.use(corsMiddleware);
  app.set('trust proxy', true);

  /**
   * Other express middleware
   */
  app.use(libraries.expressFramework.urlencoded({ extended: true }));
  app.use(libraries.expressFramework.json({ limit: '50mb' }));
  app.use(libraries.compression());
  app.use(libraries.cookieParser());
  app.use(libraries.expressFramework.static(path.join(process.cwd(), 'src', 'public')));
  app.set('views', path.join(process.cwd(), 'src', 'views'));

  deactivateDebuggingInProductionMode();

  app.use(requestLimiter);

  app.get('/', (req, res) => {
    res.status(200).json({
      success: true,
      data: {
        message: 'Welcone to Credet payment APIs',
      },
    });
  });

  app.get('/ip', (req, res) => {
    const ipAddress = req.ip;
    res.send(`Your IP address: ${ipAddress}`);
  });

  app.get('/get-fingerprint', (req, res) => {
    const fingerprint = crypto
      .createHash('sha256')
      .update(req.headers['user-agent'] + req.ip + req.acceptsLanguages().join(''))
      .digest('hex');
    // Use the fingerprint for further processing or identification

    // Send response or perform other operations
    res.json({
      success: true,
      data: {
        fingerprint: fingerprint,
      },
    });
  });

  /**
   * Handle requests to unspecified routes
   */
  app.all('*', handleUnspecifiedRouteRequests);

  app.use(errorHandler);

  return app;
}

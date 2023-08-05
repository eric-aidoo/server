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
import { deactivateDebuggingInProductionMode, generateFingerprint, getIpLocation } from './helpers/utilities';
import EmailService from './integrations/email';
import userAuthenticationRoutes from './api/users/routes/authRoute';
import UserRepository from './api/users/dataAccess/userRepository';

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
  webserver.use(featurePolicyMiddleware);
  webserver.use(expectCTMiddleware);
  webserver.set('trust proxy', true);

  // CORS middleware
  webserver.use(corsMiddleware);

  // Other express middleware
  webserver.use(libraries.expressFramework.urlencoded({ extended: true }));
  webserver.use(libraries.expressFramework.json({ limit: '50mb' }));
  webserver.use(libraries.compression());
  webserver.use(libraries.cookieParser());
  webserver.use(libraries.expressFramework.static(path.join(process.cwd(), 'src', 'public')));
  webserver.set('views', path.join(process.cwd(), 'src', 'views'));

  // webserver.use(requestLimiter);

  webserver.get('/', (req, res) => {
    res.status(200).json({
      success: true,
      data: {
        message: 'Welcone to Credet payment APIs',
      },
    });
  });

  webserver.get('/ip', async (req, res) => {
    const location = await getIpLocation(req);
    const deviceId = req.headers['user-agent'];
    console.log(location);
    const ipAddress = req.ip;
    res.status(200).json({
      ip_address: ipAddress,
      location: location,
      device: deviceId,
    });
  });

  webserver.get('/test-email', async (req, res) => {
    await EmailService.sendEmailVerificationCode({
      recipient: 'lifeoferic1@gmail.com',
      firstName: 'Eric',
      verificationCode: 'B-3683',
    });
    res.status(200).json({
      message: 'Email successfully sent',
    });
  });

  await userAuthenticationRoutes.register(webserver);

  const updatedAt = new Date().toISOString();
  const loginTime = new Date().toLocaleString(undefined, { timeZoneName: 'short' });
  console.log(loginTime);

  // const deleteUser = async () => {
  //   try {
  //     await UserRepository.deleteUser('@lifeoferic1');
  //   } catch (error) {
  //     throw error.message;
  //   }
  // };
  // deleteUser();

  // const user = await UserRepository.findUser('@lifeoferic1');
  // console.log(user);
  // const deletedUser = await UserRepository.deleteUser('@lifeoferic1');

  // Handle requests to unspecified routes
  webserver.all('*', handleUnspecifiedRouteRequests);

  webserver.use(errorHandler);

  return webserver;
}

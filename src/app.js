import path from 'path';
import {
  contentSecurityPolicyMiddleware,
  expectCTMiddleware,
  featurePolicyMiddleware,
  xFrameOptionMiddleware,
} from './middleware/security-headers';
import errorHandler from './middleware/global-error-handler';
import initializeRedisClient from './utils/redis-client';
import { deactivateDebuggingInProductionMode, generateOtpCode } from './utils/helpers';
import initializeDatabaseTables from './database/mysql/tables';
import libraries from './utils/libraries';
import asyncHandler from './middleware/async-handler';
import EmailService from './integrations/email/email-service';

export default async function createExpressApp() {
  const app = libraries.expressFramework();

  deactivateDebuggingInProductionMode();

  // Initialize redis client
  // const redis = initializeRedisClient();

  // Initialize database tables
  await initializeDatabaseTables();

  // Add security headers
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

  // Other express middleware
  app.use(libraries.expressFramework.urlencoded({ extended: true }));
  app.use(libraries.expressFramework.json({ limit: '50mb' }));
  app.use(libraries.compression());
  app.use(libraries.cookieParser());
  const TEN_MEGABYTES_MAX_SIZE = 10 * 1024 * 1024;
  app.use(
    libraries.fileUploader({
      limits: {
        fileSize: TEN_MEGABYTES_MAX_SIZE,
      },
      abortOnLimit: true,
      tempFileDir: path.join(process.cwd(), 'src', 'uploads'),
    }),
  );

  app.use(libraries.expressFramework.static(path.join(process.cwd(), 'src', 'public')));
  app.set('view engine', 'ejs');
  app.set('views', path.join(process.cwd(), 'src', 'views'));

  // API root
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Credet auth server' });
  });

  app.get(
    '/send-email',
    asyncHandler(async (req, res) => {
      const emailService = EmailService();
      const email = 'lifeoferic1@gmail.com'; // obuobijnr45@hotmail.com
      const sentEmail = await emailService.sendPasswordResetInstructionsEmail({
        emailAddress: email,
        firstName: 'Elon',
        passwordResetLink: 'https://example.com',
      });
      res.status(200).json({
        success: true,
        message: 'Email sent successfully',
      });
    }),
  );

  // Register individual user authentication routes

  // await userAuthenticationApis.registerRoutes(app);

  // Handle requests made to undefined routes
  // app.all('*', (req, res) => {
  //   res.status(404);
  //   if (req.accepts('html')) {
  //     res.render('404-page.ejs', {
  //       error: {
  //         code: 404,
  //         message: 'Page Not Found',
  //         pageTitle: 'Credet | Error',
  //       },
  //     });
  //     return;
  //   }
  //   if (req.accepts('json')) {
  //     throw new NotFoundError('Not Found');
  //   }
  //   if (req.accepts('application/json')) {
  //     throw new NotFoundError('Not Found');
  //   }
  //   return res.type('txt').send('404 Not Found');
  // });

  // const test1 = testFactory.tests.signup.executeTestCase1();
  // console.log(test1);

  // console.log(generateOtpCode());

  app.use(errorHandler);

  return app;
}

import path from 'path';
import {
  contentSecurityPolicyMiddleware,
  expectCTMiddleware,
  featurePolicyMiddleware,
  xFrameOptionMiddleware,
} from './middleware/security-headers';
import errorHandler from './middleware/global-error-handler';
import initializeRedisClient from './utils/redis-client';
import { deactivateDebuggingInProductionMode, decrypt, generateOtpCode } from './utils/helpers';
import initializeDatabaseTables from './database/mysql/tables';
import libraries from './utils/libraries';
import asyncHandler from './middleware/async-handler';
import EmailService from './integrations/email/email-service';
import userAuthenticationRoutes from './api/v1/user/routes/auth-route';
import UserRepository from './database/mysql/repositories/user-repository';
import { MissingFieldError } from './utils/error-responses';

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

  app.get(
    '/get-user',
    asyncHandler(async (req, res) => {
      const { email } = req.query;
      if (!email) {
        throw new MissingFieldError('email is required');
      }
      const user = await UserRepository.findUser(email);
      res.status(200).json({
        success: true,
        data: user,
      });
    }),
  );

  await userAuthenticationRoutes.register(app);

  // const url = `http://localhost:3000/user/reset-password/0e4760820ee7955a5e436bdf98b0.n6x6God5c2tv.79322ee05099494f43572a245384d5af/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxpZmVvZmVyaWMxQGdtYWlsLmNvbSIsImlkIjoiMGU0NzYwODIwZWU3OTU1YTVlNDM2YmRmOThiMC5uNng2R29kNWMydHYuNzkzMjJlZTA1MDk5NDk0ZjQzNTcyYTI0NTM4NGQ1YWYiLCJpYXQiOjE2ODY2MjE0NjMsImV4cCI6MTY4NjYyMTQ5MywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIn0.LcRQvj_FsvYJjVFmTegYyEN9IH4cgny-pv7swz2EoN8`;
  // const id = url.split('/')[5];
  // const decryptedId = decrypt(id);
  // console.log(id);
  // console.log(decryptedId);

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

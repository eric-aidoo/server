import libraries from './utils/libraries';
libraries.dotenv.config();

const ONE_DAY = 24 * 60 * 60 * 1000;
const THREE_MINUTES = 180 * 1000;

const config = {
  mysql: {
    host: process.env.MYSQL_DB_URL,
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    waitForConnections: true,
    connectionLimit: process.env.APP_ENV === 'development' ? 3 : process.env.MYSQL_DB_POOL_LIMIT,
    queueLimit: 0,
  },
  redis: {
    user: process.env.REDIS_USER,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    maxAge: 60, // 1min for now, but will change to 3 months (7776000) in production
  },
  server: {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
    environment: process.env.APP_ENV,
    isInDevMode: process.env.APP_ENV === 'development',
  },
  oAuth: {
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    passwordResetLinkSecret: process.env.JWT_PASSWORD_RESET_SECRET,
    accessTokenExpiration: '30s', // 15m
    refreshTokenExpiration: '1m', // 90d or 3 months
    cookieMaxAge: ONE_DAY,
  },
  encryption: {
    secret: process.env.DATA_ENCRYPTION_SECRET,
  },
  authentication: {
    loginRetryWindow: THREE_MINUTES,
    loginAttemptsPerWindow: 5,
  },
  emailAuthentication: {
    user: process.env.EMAIL_AUTHENTICATION_USER,
    password: process.env.EMAIL_AUTHENTICATION_PASSWORD,
  },
};

export default config;

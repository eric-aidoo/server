import config from '../config/appConfig';
import libraries from '../helpers/libraries';

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://127.0.0.1:5501',
      'https://violet-dragons-pay.loca.lt',
      'http://10.0.0.34:5501',
      'http://10.0.0.246:5501',
      'https://dev.credetpay.com',
      'http://localhost:3005',
      'https://www.credet.app',
      'https://credet.app',
      'https://www.credetpay.com',
      'https://credetpay.com',
      'https://auth.credet.app',
      'https://api.credetpay.com',
      'https://www.movecredet.com',
      'https://movecredet.com',
    ];

    if (config.server.isInDevMode) {
      // Allow any origin in dev mode
      callback(null, true);
    } else if (!origin || allowedOrigins.includes(origin)) {
      // Allow requests from the allowed origins in production mode
      callback(null, true);
    } else {
      // Block requests from other origins
      callback(new Error('Not allowed by CORS'));
    }
  },
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'User-Agent',
    'Content-Type',
    'Accept',
    'Authorization',
    'If-Modified-Since',
    'Cache-Control',
    'Referer',
  ],
  methods: 'GET, POST',
  credentials: true,
};

const corsMiddleware = libraries.cors(corsOptions);

export default corsMiddleware;

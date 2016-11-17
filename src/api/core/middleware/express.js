import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import expressValidator from 'express-validator';
import hpp from 'hpp';
import lusca from 'lusca';
import morgan from 'morgan';

export default function(app) {
  app.disable('x-powered-by');
  app.set('trust proxy', 'loopback');
  // enable CORS - Cross Origin Resource Sharing
  // allow for sending credentials (auth token) in the headers.
  app.use(cors({ origin: true, credentials: true }));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
  app.use(hpp());
  app.use(expressValidator());
  app.use(methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    app.use(morgan('dev'));
  }

  if (process.env.NODE_ENV === 'production') {
    app.use(lusca({
      xframe: 'SAMEORIGIN',
      hsts: {
        // 1 year, in seconds
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
      xssProtection: true,
    }));
  }
}

import cors from 'cors';
import uuid from 'uuid';
import compression from 'compression';
import hpp from 'hpp';
import responseTime from 'response-time';

function nonceMiddleware(req, res, next) {
  res.locals.nonce = uuid.v4(); // eslint-disable-line no-param-reassign
  next();
}

export default app => {
  app.disable('x-powered-by');
  app.set('trust proxy', 'loopback');
  app.use(nonceMiddleware);
  app.use(compression());
  app.use(responseTime());
  // enable CORS - Cross Origin Resource Sharing
  // allow for sending credentials (auth token) in the headers.
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );

  app.use(hpp());
};

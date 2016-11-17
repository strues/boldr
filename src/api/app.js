import Express from 'express';
import errorHandler from 'errorhandler';
import { authMiddleware, expressMiddleware, errorCatcher, rbac } from './core/middleware';
import routes from './routes/index';

const config = require('./config/config');

const app = new Express();
const env = config.get('node_env') || 'development';

// contains body-parser, method-override, shrink-ray, helmet
expressMiddleware(app);
// contains cookie-parser, passport, jwt, session
authMiddleware(app);
// attaches to router
app.use(rbac());
app.use(config.get('prefix'), routes);

app.use(errorCatcher);

if (env === 'development' || env === 'test') {
  app.use(errorHandler());
}

export default app;

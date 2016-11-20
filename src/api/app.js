import Express from 'express';
import { authMiddleware, expressMiddleware, errorCatcher, rbac } from './core/middleware';
import routes from './routes/index';

const config = require('./config/config');

const app = new Express();
const env = config.get('node_env') || 'development';

// contains body-parser, method-override, shrink-ray, helmet
expressMiddleware(app);
// contains cookie-parser, passport, jwt, session
authMiddleware(app);
app.use(rbac());
// attaches to router
app.use(config.get('prefix'), routes);

app.use(errorCatcher);

app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    message: err.message,
    stack: env === 'development' ? err.stack : {},
  }),
);

export default app;

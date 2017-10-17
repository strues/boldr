import config from '@boldr/config';
import initPubsub from '../middleware/initPubsub';
import authRoutes from './auth/auth.routes';
import tokenRoutes from './token/token.routes';

export default app => {
  const API_PREFIX = config.get('server.prefix');
  // attach req.pubSub to our routes
  app.use(API_PREFIX, initPubsub);

  app.get(`${API_PREFIX}/health-check`, (req, res) => {
    res.status(200);
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.json({
      health: 'good',
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
    });
  });

  app.use(`${API_PREFIX}/auth`, authRoutes);
  app.use(`${API_PREFIX}/tokens`, tokenRoutes);
  // app.use(`${API_PREFIX}/users`, userRoutes);
};

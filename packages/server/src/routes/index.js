import { config } from '../config';
import authRoutes from './auth/auth.routes';
import tokenRoutes from './token/token.routes';
// import userRoutes from './user/user.routes';

const API_PREFIX = config.get('server.prefix');

export default app => {
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

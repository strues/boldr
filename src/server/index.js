import './server';
import logger from './services/logger';

if (module.hot) {
  module.hot.status(event => {
    if (event === 'abort' || event === 'fail') {
      logger.error(`HMR error status: ${event}`);
      // Signal webpack.run.js to do full-reload of the back-end
      process.exit(250);
    }
  });
  module.hot.accept();
  logger.info('✅  Server-side HMR Enabled!');
}

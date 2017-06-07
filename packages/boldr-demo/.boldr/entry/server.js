import boldrServer from 'boldr-core/lib/framework/server';
import _debug from 'debug';
import config from '../config';

(async () => {
  const debug = _debug('boldr:demo:entry:server');
  const port = config.serverPort;
  const host = config.serverHost;

  const app = await boldrServer(config);

  app.listen(port);

  debug(`Server running at http://${host}:${port}.`);
})();

import server from 'boldr-core/lib/framework/server';
import _debug from 'debug';
import config from '../.boldr/config';

(async () => {
  const debug = _debug('boldr:demo:bin:server');
  const port = config.serverPort;
  const host = config.serverHost;

  const app = await server(config);

  app.listen(port);

  debug(`Server running at http://${host}:${port}.`);
})();

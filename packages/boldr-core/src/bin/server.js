import _debug from 'debug';
import pkgUp from 'pkg-up';
import config from '../config';
import server from '../framework/server';

(async () => {
  const debug = _debug('boldr:core:bin:server');
  // const pkgAppPath = pkgUp.sync('.')
  // debug(pkgAppPath);
  const port = config.serverPort;
  const host = config.serverHost;

  const app = await server(config);

  app.listen(port);

  debug(`Running on http://${host}:${port}.`);
})();

import { resolve } from 'path';
import appRoot from '@boldr/utils/lib/node/appRoot';
import { createBackend } from '@boldr/backend';
import config from '@boldr/config';

const ROOT = appRoot.get();
const SERVER_OUTPUT = resolve(ROOT, config.tools.paths.output.server);
const CLIENT_OUTPUT = resolve(ROOT, config.tools.paths.output.client);
const PORT = parseInt(process.env.PORT, 10);

/* eslint-disable no-console */
/* eslint-disable import/no-commonjs */
/* eslint-disable security/detect-non-literal-require */

export default function startRenderServer(buildConfig = {}) {
  const clientStats = require(`${CLIENT_OUTPUT}/stats.json`);
  const serverRender = require(`${SERVER_OUTPUT}/server.js`).default;

  const server = createBackend({
    staticConfig: {
      public: '/static/',
      path: CLIENT_OUTPUT,
    },
    localeConfig: buildConfig.locale,
    afterSecurity: [],
    beforeFallback: [
      serverRender({
        clientStats,
      }),
    ],
    enableCSP: false,
    enableNonce: false,
  });

  server.use(serverRender({ clientStats }));

  server.listen(PORT, () => {
    console.log(`Rendering server running on port: ${PORT}`);
  });
}

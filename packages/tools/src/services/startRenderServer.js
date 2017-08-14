import { resolve } from 'path';
import appRoot from '@boldr/utils/lib/node/appRoot';
import dotenv from 'dotenv';

import createExpress from '../server/createExpress';

// Initialize environment configuration
dotenv.config();

const ROOT = appRoot.get();
const SERVER_OUTPUT = resolve(ROOT, process.env.SERVER_OUTPUT);
const CLIENT_OUTPUT = resolve(ROOT, process.env.CLIENT_OUTPUT);
const PORT = process.env.PORT;

/* eslint-disable no-console */
/* eslint-disable import/no-commonjs */
/* eslint-disable security/detect-non-literal-require */

export default function startRenderServer() {
  const server = createExpress({});

  const clientStats = require(`${CLIENT_OUTPUT}/stats.json`);
  const serverRender = require(`${SERVER_OUTPUT}/main.js`).default;

  server.use(serverRender({ clientStats }));

  server.listen(PORT, () => {
    console.log(`Rendering server running on port: ${PORT}`);
  });
}

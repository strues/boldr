/**
 * @module boldr/framework/server/server
 */
import express from 'express';
import webpack from 'webpack';
import fs from 'fs-extra';
import _debug from 'debug';
import uuid from 'uuid';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import createDevDlls from '../../webpack/createDevDlls';
import createClientConfig from '../../webpack/createWebpackClientConfig';
import Ssr from './ssrMiddleware';

const debug = _debug('boldr:core:framework:server');
function nonceMiddleware(req, res, next) {
  res.locals.nonce = uuid.v4(); // eslint-disable-line no-param-reassign
  next();
}
export default async function boldrServer(config) {
  const app = express();

  app.use(nonceMiddleware);

  let clientInfo;
  if (config.env === 'development') {
    await createDevDlls(config);
    const clientConfig = createClientConfig(config);
    const clientCompiler = webpack(clientConfig);

    const { publicPath } = clientConfig.output;
    const devMw = webpackDevMiddleware(clientCompiler, {
      publicPath,
      hot: true,
      quiet: config.compilerQuiet,
      noInfo: config.compilerQuiet,
      lazy: false,
      stats: config.compilerStats,
      serverSideRender: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });

    app.use(devMw);
    app.use(
      webpackHotMiddleware(clientCompiler, {
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
      }),
    );

    app.use(express.static(config.boundPath.public()));
    app.use('/static', express.static(config.boundPath.static()));
  } else {
    fs.readJSON(config.boundPath.compiled(config.universal.clientStats), (err, data) => {
      if (err) {
        clientInfo = {};
        debug('Unable to read bundle', err);
        return;
      }

      clientInfo = data;
    });

    if (!config.hasOwn || !config.hasOwn.nginx) {
      app.use(express.static(config.boundPath.public()));
    }
  }

  const ssr = new Ssr(config);

  const ssrMw = await ssr.init();
  app.use(ssrMw(() => clientInfo));

  return app;
}

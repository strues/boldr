const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const buildWebpackDlls = require('../../internal/webpack/buildWebpackDlls');
const createServerConfig = require('../../internal/webpack/createServerConfig');
const createClientConfig = require('../../internal/webpack/createClientConfig');
const wpServerMiddleware = require('./wpServer');

const router = express.Router();

async function setupHotDev() {
  await buildWebpackDlls();
  const clientConfig = createClientConfig();
  const serverConfig = createServerConfig();
  const publicPath = clientConfig.output.publicPath;
  const outputPath = clientConfig.output.path;

  const multiCompiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = multiCompiler.compilers[0];

  router.use(webpackDevMiddleware(multiCompiler, { publicPath, serverSideRender: true, lazy: false }));
  router.use(webpackHotMiddleware(clientCompiler));
  router.use(
    wpServerMiddleware(multiCompiler, {
      serverRendererOptions: { outputPath },
    }),
  );
  return router;
}
setupHotDev();
module.exports = router;

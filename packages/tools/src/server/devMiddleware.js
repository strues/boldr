/* eslint-disable prefer-destructuring */
import { resolve } from 'path';
import appRoot from '@boldr/utils/lib/node/appRoot';
import dotenv from 'dotenv';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import createWebpackConfig from '../createWebpackConfig';

// Initialize environment configuration
dotenv.config();

const ROOT = appRoot.get();
const CLIENT_OUTPUT = resolve(ROOT, process.env.CLIENT_OUTPUT);
const PUBLIC_PATH = process.env.PUBLIC_PATH;

export default function devMiddleware(server) {
  const clientConfig = createWebpackConfig({
    target: 'client',
    env: 'development',
  });

  const serverConfig = createWebpackConfig({
    target: 'server',
    env: 'development',
  });

  const multiCompiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = multiCompiler.compilers[0];

  server.use(
    webpackDevMiddleware(multiCompiler, {
      // required
      publicPath: PUBLIC_PATH,

      // display no info to console (only warnings and errors)
      noInfo: false,
      quiet: true,
      // prevent loading before bundle is done
      serverSideRender: true,
    }),
  );

  server.use(webpackHotMiddleware(clientCompiler));

  // keeps serverRender updated with arg: { clientStats, outputPath }
  server.use(
    webpackHotServerMiddleware(multiCompiler, {
      serverRendererOptions: {
        outputPath: CLIENT_OUTPUT,
      },
    }),
  );

  return multiCompiler;
}

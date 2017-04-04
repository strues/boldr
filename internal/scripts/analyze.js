// This script creates a webpack stats file on our production build of the
// client bundle and then launches the webpack-bundle-analyzer tool allowing
// you to easily see what is being included within your bundle.  Really helpful
// in those parses at trimming your bundle sizes down.
// @see https://github.com/th0r/webpack-bundle-analyzer

import { resolve as pathResolve } from 'path';
import fs from 'fs';
import webpack from 'webpack';
import appRootDir from 'app-root-dir';
import { exec } from '../utils';
import webpackConfigFactory from '../webpack/configFactory';
import config from '../../config';

// eslint-disable-next-line no-unused-vars
const [x, y, ...args] = process.argv;
const analyzeServer = args.findIndex(arg => arg === '--server') !== -1;
const analyzeClient = args.findIndex(arg => arg === '--client') !== -1;

let target;

if (analyzeServer) target = 'server';
else if (analyzeClient) target = 'client';
else throw new Error('Please specify --server OR --client as target');

const anaylzeFilePath = pathResolve(appRootDir.get(), config('bundles.client.outputPath'), '__analyze__.json');

const clientCompiler = webpack(webpackConfigFactory({ target,
  optimise: true }));

clientCompiler.run((err, stats) => {
  if (err) {
    console.error(err);
  } else {
    // Write out the json stats file.
    fs.writeFileSync(anaylzeFilePath, JSON.stringify(stats.toJson('verbose'), null, 4));

    // Run the bundle analyzer against the stats file.
    const cmd = `webpack-bundle-analyzer ${anaylzeFilePath} ${config('bundles.client.outputPath')}`;
    exec(cmd);
  }
});

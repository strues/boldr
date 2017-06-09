/* eslint-disable eqeqeq */
import path from 'path';
import webpack from 'webpack';
import logger from 'boldr-utils/lib/logger';
import _debug from 'debug';

import createCompiler from '../compilers/createCompiler';
import createBrowserWebpack from '../createBrowserWebpack';
import createNodeWebpack from '../createNodeWebpack';

import DevServer from './devServer';
import DevClient from './devClient';
import buildDevDlls from './buildDevDlls';

const debug = _debug('boldr:dx:services:boldrDev');

class BoldrDev {
  constructor(config) {
    this.devClient = null;
    this.devServer = null;
    this.config = config;

    this.init(config);
  }
  async init(config) {
    const serverConfig = createNodeWebpack({
      config,
      mode: 'development',
      name: 'server',
    });
    const clientConfig = createBrowserWebpack({
      config,
      mode: 'development',
      name: 'client',
    });

    await new Promise((resolve, reject) => {
      const clientCompiler = createCompiler(clientConfig);
      clientCompiler.plugin('done', stats => {
        if (!stats.hasErrors()) {
          resolve(clientCompiler);
        } else {
          reject();
        }
      });
      const serverCompiler = createCompiler(serverConfig);
      this.devClient = new DevClient(clientCompiler, this.config);
      this.devServer = new DevServer(serverCompiler, clientCompiler);
    });
  }
  shutdown() {
    // Shutdown the client server, then the node.
    return handleShutdown(this.devClient)
      .then(() => handleShutdown(this.devServer))
      .catch(error => {
        console.error(error);
      });
  }
}

function handleShutdown(server) {
  return server ? server.shutdown() : Promise.resolve();
}

export default BoldrDev;

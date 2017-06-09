/* @flow */
/* eslint-disable require-await */
import path from 'path';
import fs from 'fs-extra';
import appRoot from 'boldr-utils/lib/node/appRoot';
import _debug from 'debug';
import webpack from 'webpack';
import terminate from 'terminate';
import logger from 'boldr-utils/lib/logger';
import loadConfiguration from './config/loadConfig';

const debug = _debug('boldr:dx:engine');

class Engine {
  cwd: string;
  configFileName: string;
  plugins: Array<PluginController>;
  // inputOptions is passed from the user
  // via a command.
  constructor(cwd: any) {
    this.cwd = cwd;
    this.configFileName = './boldr.config.js';
  }

  getConfigPath(): string {
    return path.resolve(this.cwd, './boldr.config.js');
  }

  getInputOptions() {
    return this.inputOptions;
  }

  getConfiguration(): Config {
    return loadConfiguration(this);
  }

  // determine our NODE_ENV used as the identifier
  getNodeEnv(): string {
    debug('getNodeEnv: ', this.getConfiguration());
    return this.getConfiguration().env.NODE_ENV;
  }

  async build(): Promise<any> {
    const config: Config = loadConfiguration(this);

    const pluginControllers: PluginController[] = await Promise.all(
      config.plugins.map(plugin => plugin(this, true)),
    );

    await Promise.all(pluginControllers.map(pluginController => pluginController.build()));
  }
  async dev(): Promise<any> {
    const config: Config = loadConfiguration(this);

    this.plugins = await Promise.all(config.plugins.map(plugin => plugin(this, false)));

    await Promise.all(this.plugins.map(p => p.dev()));
  }
  async start(): Promise<any> {
    const config: Config = loadConfiguration(this);
    this.plugins = await Promise.all(config.plugins.map(plugin => plugin(this, false)));

    await Promise.all(this.plugins.map(p => p.start()));
  }

  async restart(): Promise<any> {
    // terminate all plugins
    await Promise.all(this.plugins.map(pluginController => pluginController.end()));

    // start all plugins
    await this.start();
  }

  async stop(): Promise<any> {
    await Promise.all(this.plugins.map(pluginController => pluginController.end()));
  }
}

export default Engine;

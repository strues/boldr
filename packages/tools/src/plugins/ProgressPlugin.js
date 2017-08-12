/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/

/* eslint-disable no-magic-numbers */
import { relative } from 'path';
import appRoot from '@boldr/utils/lib/node/appRoot';
import ora from 'ora';

const ROOT = appRoot.get();

export default class ProgressPlugin {
  constructor({ prefix }) {
    this.prefix = prefix;
  }

  apply(compiler) {
    // eslint-disable-next-line
    let doneModules = 0;
    let spinner = null;
    let lastModule = null;
    const prefix = this.prefix ? `${this.prefix} ` : '';

    function display(message) {
      if (message !== '') {
        spinner.text = prefix + message;

        // We somehow have to force rendering otherwise busy Webpack wouldn't let us.
        spinner.render();
      } else {
        spinner.succeed(`${prefix}Done!`);
      }
    }
    // eslint-disable-next-line
    function moduleDone(module) {
      doneModules += 1;

      let humanIndex;
      let humanModuleId = lastModule;

      humanIndex = humanModuleId.lastIndexOf(' ');
      humanModuleId =
        humanIndex === -1
          ? humanModuleId
          : humanModuleId.slice(humanIndex + 1, humanModuleId.length);

      humanIndex = humanModuleId.lastIndexOf('!');
      humanModuleId =
        humanIndex === -1
          ? humanModuleId
          : humanModuleId.slice(humanIndex + 1, humanModuleId.length);

      humanIndex = humanModuleId.indexOf('?');
      humanModuleId = humanIndex === -1 ? humanModuleId : humanModuleId.slice(0, humanIndex);

      humanModuleId = relative(ROOT, humanModuleId).replace(/^node_modules\//, '~/');

      if (humanModuleId.startsWith('"') && humanModuleId.endsWith('"')) {
        humanModuleId = humanModuleId.slice(1, -1);
      }

      // Ignore Context Logic Imports
      if (humanModuleId.includes('|')) {
        return;
      }

      // Exclude hard to read directly relative modules
      if (humanModuleId.startsWith('..')) {
        return;
      }

      if (/^[a-zA-Z0-9\-_/~.]{0,50}$/.test(humanModuleId)) {
        display(`Processing modules ${humanModuleId}...`);
      }
    }

    compiler.plugin('compilation', compilation => {
      if (compilation.compiler.isChild()) {
        return;
      }

      doneModules = 0;

      spinner = ora({ interval: 12 });
      spinner.start();

      display(0, 'Compiling');

      compilation.plugin('build-module', module => {
        lastModule = module.identifier();
      });

      compilation.plugin('failed-module', moduleDone);
      compilation.plugin('succeed-module', moduleDone);

      const syncHooks = {
        seal: 'Sealing',
        optimize: 'Optimizing',
        'optimize-modules-basic': 'Optimizing modules',
        'optimize-chunks-basic': 'Optimizing chunks',
        'optimize-chunk-modules': 'Optimizing chunk modules',
        'optimize-module-order': 'Optimizing module order',
        'optimize-module-ids': 'Optimizing module ids',
        'optimize-chunk-order': 'Optimizing chunk order',
        'optimize-chunk-ids': 'Optimizing chunk ids',
        'before-hash': 'Hashing',
        'before-module-assets': 'Processing module assets',
        'before-chunk-assets': 'Processing chunk assets',
        record: 'Recording',
      };

      Object.keys(syncHooks).forEach(name => {
        let pass = 0;
        const message = syncHooks[name];
        compilation.plugin(name, () => {
          if (pass++ > 0) {
            display(`${message} [pass ${pass}]`);
          } else {
            display(message);
          }
        });
      });

      compilation.plugin('optimize-tree', (chunks, modules, callback) => {
        display('Optimizing tree');
        callback();
      });

      compilation.plugin('additional-assets', callback => {
        display('Processing assets');
        callback();
      });

      compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
        display('Optimizing chunks');
        callback();
      });

      compilation.plugin('optimize-assets', (assets, callback) => {
        display('Optimizing assets');
        callback();
      });
    });

    compiler.plugin('emit', (compilation, callback) => {
      display('Emitting');
      callback();
    });

    compiler.plugin('done', () => {
      display('');
    });
  }
}

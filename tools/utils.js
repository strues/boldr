/* @flow */

import HappyPack from 'happypack';
import notifier from 'node-notifier';
import colors from 'colors/safe';
import { execSync } from 'child_process';
import appRootDir from 'app-root-dir';

const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

type HappyPackLoaderConfig = {
  path: string,
  query?: Object,
};

type HappyPackConfig = {
  name: string,
  loaders: Array<string|HappyPackLoaderConfig>,
};

export function happyPackPlugin({ name, loaders }: HappyPackConfig) {
  return new HappyPack({
    id: name,
    verbose: false,
    threads: 5,
    loaders,
  });
}

export function removeEmpty(x : Array<any>) : Array<any> {
  return x.filter(y => y != null);
}

export function ifElse(condition: boolean) {
  // $FlowIssue
  return (then, or) => (condition ? then : or);
}

// :: ...Object -> Object
export function merge() {
  const funcArgs = Array.prototype.slice.call(arguments); // eslint-disable-line prefer-rest-params

  return Object.assign.apply(
    null,
    removeEmpty([{}].concat(funcArgs))
  );
}

export function exec(command : string) {
  execSync(command, { stdio: 'inherit', cwd: appRootDir.get() });
}

export function ensureNotInClientBundle() {
  if (process.env.IS_CLIENT) {
    throw new Error(
      'You are importing the application configuration into the client bundle! This is super dangerous as you will essentially be exposing all your internals/logins/etc to the world.  If you need some configuration that will be consumed by the client bundle then add it to the clientSafe configuration file.'
    );
  }
}

type NotificationOptions = {
  title: string,
  message: string,
  notify?: boolean,
  level?: 'info'|'warn'|'error'
};

export function log(options: NotificationOptions) {
  const title = `${options.title.toUpperCase()}`;

  if (options.notify) {
    notifier.notify({
      title,
      message: options.message,
    });
  }

  const level = options.level || 'info';
  const msg = `==> ${title} -> ${options.message}`;

  switch (level) {
    case 'warn': console.log(colors.red(msg)); break;
    case 'error': console.log(colors.bgRed.white(msg)); break;
    case 'info':
    default: console.log(colors.green(msg));
  }
}

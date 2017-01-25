/* @flow */

import HappyPack from 'happypack';
import notifier from 'node-notifier';
import colors from 'colors/safe';
import { execSync } from 'child_process';
import appRootDir from 'app-root-dir';

type HappyPackLoaderConfig = {
  path: string,
  query?: Object,
};

type HappyPackConfig = {
  name: string,
  loaders: Array<string|HappyPackLoaderConfig>,
};

// Generates a HappyPack plugin.
// @see https://github.com/amireh/happypack/
export function happyPackPlugin({ name, loaders }: HappyPackConfig) {
  return new HappyPack({
    id: name,
    verbose: false,
    threads: 5,
    loaders,
  });
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

export function exec(command: string) {
  execSync(command, { stdio: 'inherit', cwd: appRootDir.get() });
}

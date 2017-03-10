/* @flow */
import { execSync } from 'child_process';
import appRootDir from 'app-root-dir';
import chalk from 'chalk';

type NotificationOptions = {
  title: string,
  message: string,
  notify?: boolean,
  level?: 'info'|'warn'|'error'
};

export function log(options: NotificationOptions) {
  const title = `${options.title.toUpperCase()}`;

  const level = options.level || 'info';
  const msg = `==> ${title} -> ${options.message}`;

  switch (level) {
    case 'warn':
      console.log(chalk.red(`⚠️  => ${msg}`));
      break;
    case 'error':
      console.log(chalk.white.bgRed(`🔥  => ${msg}`));
      break;
    case 'info':
    default: console.log(chalk.cyan(`🐸  => ${msg}`));
  }
}

export function exec(command: String) {
  execSync(command, { stdio: 'inherit', cwd: appRootDir.get() });
}

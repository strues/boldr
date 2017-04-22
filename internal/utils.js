import { execSync } from 'child_process';
import chalk from 'chalk';
import appRootDir from 'app-root-dir';

import HappyPack from 'happypack';

export function happyPackPlugin({ name, loaders }) {
  return new HappyPack({
    id: name,
    verbose: false,
    threads: 4,
    loaders,
  });
}
export function log(options: NotificationOptions) {
  const title = `${options.title.toUpperCase()}`;

  const level = options.level || 'info';
  const msg = `==> ${title} -> ${options.message}`;

  switch (level) {
    case 'warn':
      console.log(chalk.red(`⚠️  ${msg}`));
      break;
    case 'error':
      console.log(chalk.white.bgRed(`⁉️ 🔥  ${msg}`));
      break;
    case 'info':
    default: console.log(chalk.cyan(`♠️  ${msg}`));
  }
}

export function exec(command) {
  execSync(command, { stdio: 'inherit',
    cwd: appRootDir.get() });
}

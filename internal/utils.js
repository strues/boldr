import { execSync } from 'child_process';
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

export function exec(command) {
  execSync(command, {
    stdio: 'inherit',
    cwd: appRootDir.get(),
  });
}

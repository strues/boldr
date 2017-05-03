import os from 'os';
import { execSync } from 'child_process';
import appRootDir from 'app-root-dir';

import HappyPack from 'happypack';

export function happyPackPlugin({ name, loaders }) {
   const compilerThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length,
  });
  return new HappyPack({
    id: name,
    verbose: false,
    threadPool: compilerThreadPool,
    loaders,
  });
}

export function exec(command) {
  execSync(command, {
    stdio: 'inherit',
    cwd: appRootDir.get(),
  });
}

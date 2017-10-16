import path from 'path';

import fs from 'fs-extra';
import jsonfile from 'jsonfile';
import execa from 'execa';
import logger from '@boldr/utils/lib/logger';
import pify from 'pify';
import appRoot from '@boldr/utils/lib/node/appRoot';
import partialPkg from '../util/partialPkg';

const jf = pify(jsonfile);

function copyStaticFiles(projectRoot) {
  return fs
    .copy(path.join(__dirname, '../../static'), projectRoot)
    .then(() => {
      return console.log('success!');
    })
    .catch(err => {
      console.error(err);
    });
}
function fillPackageJson(projectRoot) {
  const pkgPath = path.join(projectRoot, 'package.json');

  return jf
    .readFile(pkgPath)
    .catch(error => {
      if (error.code !== 'ENOENT') {
        return Promise.reject(error);
      }

      return execa('npm', ['init', '-y'], { cwd: projectRoot }).then(() => jf.readFile(pkgPath));
    })
    .then(pkg => {
      const newPkg = { ...pkg, ...partialPkg };

      return jf.writeFile(pkgPath, newPkg, { spaces: 2 });
    });
}
function initilizeModuleDirectory(projectRoot) {
  return copyStaticFiles(projectRoot)
    .then(() => fillPackageJson(projectRoot))
    .then(() => Promise.resolve());
}

function task(args, options) {
  logger.task('Creating a new migration');
  const rootDir = appRoot.get();
  logger.info('path', args, options);
  const projectRoot = path.resolve(rootDir, args.path);
  fs.ensureDirSync(projectRoot);
  initilizeModuleDirectory(projectRoot);
}

function register(program) {
  program
    .command('init', 'Initialize a new project.')
    .argument('<path>', 'Directory to initialize', null, process.cwd())
    .action(task);
}

export default { register };

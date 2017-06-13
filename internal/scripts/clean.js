/* eslint-disable import/no-dynamic-require,global-require, no-console */
const path = require('path');
const fs = require('mz/fs');
// Ensure top-level is installed
let shell;
try {
  shell = require('shelljs');
} catch (e) {
  console.log(
    "❗ Remember to have run 'npm install' or 'yarn install' before executing the script.",
  );
  process.exit();
}

const logTask = msg => console.log(`👌  ${msg}`);

const cleanPackages = at => {
  const result = shell.rm('-rf', `${at}/node_modules`);
  if (result.code !== 0) {
    console.log(`Unable to clean node_modules in ${at}`);
  }
  logTask(`Cleaned ${at}\n`);
};

const getPackages = () =>
  fs.readdirSync('packages').reduce((pkgs, pkg) => {
    const pkgPath = path.join(process.cwd(), 'packages', pkg);
    const pkgJson = path.join(pkgPath, 'package.json');
    try {
      if (fs.statSync(pkgPath).isDirectory() && fs.statSync(pkgJson).isFile()) {
        1;
        const packageName = require(pkgJson).name;
        pkgs.push({ path: pkgPath, name: packageName });
      }
    } catch (e) {
      return pkgs;
    }
    return pkgs;
  }, []);

// Start cleaning
console.log('\n🛁  Cleaning...\n');

// Clean all of the monorepo packages.
getPackages().forEach(pkg => cleanPackages(pkg.path));

// npm unlink packages
shell.exec('yarn unlink', {
  cwd: path.join(process.cwd(), 'packages', 'boldr-core'),
});
logTask('unlinked boldr-core\n');
shell.exec('yarn unlink', {
  cwd: path.join(process.cwd(), 'packages', 'boldr-dx'),
});
logTask('unlinked boldr-dx');
shell.exec('yarn unlink', {
  cwd: path.join(process.cwd(), 'packages', 'boldr-utils'),
});
logTask('unlinked boldr-utils');
shell.exec('yarn unlink', {
  cwd: path.join(process.cwd(), 'packages', 'boldr-cli'),
});
logTask('unlinked boldr-cli');
shell.exec('yarn unlink', {
  cwd: path.join(process.cwd(), 'web'),
});
logTask('unlinked boldr');
// Done
console.log('\n✅  cleaned\n');

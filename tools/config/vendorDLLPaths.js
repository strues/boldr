const pathResolve = require('path').resolve;
const appRootPath = require('app-root-path').toString();
const envVars = require('./envVars');
const defs = require('./defs');

const dllName = defs.files.dll;
const bundleSubDir = `${defs.dirs.client}/${defs.dirs.dll}`;
const dllOutputDir = pathResolve(appRootPath, envVars.BUNDLE_OUTPUT_PATH, `./${bundleSubDir}`);
const dllWebPath = `${bundleSubDir}/${dllName}.js`;
const dllPath = pathResolve(dllOutputDir, `${dllName}.js`);
const dllJsonPath = pathResolve(dllOutputDir, `${dllName}.json`);
const dependenciesHashFilePath = pathResolve(dllOutputDir, 'dependencies_hash');

module.exports = {
  dllName,
  dllOutputDir,
  dllPath,
  dllJsonPath,
  dependenciesHashFilePath,
  dllWebPath
};

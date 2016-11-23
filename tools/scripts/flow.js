const existsSync = require('fs').existsSync;
const resolvePath = require('path').resolve;
const appRoot = require('app-root-dir');
const { exec, createNotification } = require('../utils');

const appRootPath = appRoot.get();
const flowTypedDir = resolvePath(appRootPath, 'flow-typed');

if (!existsSync(flowTypedDir)) {
  createNotification({
    title: 'flow',
    level: 'warn',
    message: 'You haven\'t installed the flow-typed definitions. Please run the `npm run flow:defs` command if you would like to install them.',
  });
}

exec('flow');

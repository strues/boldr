/* eslint-disable no-unused-vars */

import { resolve as pathResolve } from 'path';
import appRootDir from 'app-root-dir';

// Middleware to server our service worker.
function serviceWorkerMiddleware(req, res, next) {
  res.sendFile(pathResolve(appRootDir.get(), './boldrCMS/client', 'sw.js'));
}

export default serviceWorkerMiddleware;

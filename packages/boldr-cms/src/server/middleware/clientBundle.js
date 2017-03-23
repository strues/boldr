/* @flow */

import { resolve as pathResolve } from 'path';
import express from 'express';
import appRootDir from 'app-root-dir';

// Middleware to server our client bundle.
export default express.static(
  // client bundle output path
  pathResolve(appRootDir.get(), './boldrCMS/client'),
  { maxAge: '365d' },
);

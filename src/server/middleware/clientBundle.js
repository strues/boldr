/* @flow */
import { resolve as pathResolve } from 'path';
import express from 'express';
import appRootDir from 'app-root-dir';
import boldrConfig from '../../../config/boldr';

// Middleware to server our client bundle.
export default express.static(
  pathResolve(appRootDir.get(), boldrConfig.bundles.client.outputPath),
  { maxAge: boldrConfig.browserCacheMaxAge },
);

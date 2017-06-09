#!/usr/bin/env node
/* eslint-disable no-var, prefer-arrow-callback, prefer-template, no-console */
var minNodeVersion = 7;

if (Number(process.versions.node.split('.')[0]) < minNodeVersion) {
  console.error('Boldr requires Node v' + minNodeVersion + 'or higher.');
  process.exit(1);
}

require('../lib/boldr-dx.js');

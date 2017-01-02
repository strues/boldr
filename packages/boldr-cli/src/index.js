const program = require('commander');
const pkg = require('../package.json');

const version = pkg.version;

program
  .version(version);

program
  .usage('[command] [options]');

const rimraf = require('rimraf');

process.chdir(__dirname);

rimraf.sync('../../packages/*/es');
rimraf.sync('../../packages/*/.happypack'),
rimraf.sync('../../packages/*/dist');
rimraf.sync('../../packages/*/compiled');
rimraf.sync('../../packages/*/coverage');
rimraf.sync('../../packages/*/node_modules');
rimraf.sync('../../packages/*/node_modules/.cache');
rimraf.sync('../../packages/*/*.log');
rimraf.sync('../../coverage');
rimraf.sync('../../node_modules');
rimraf.sync('../../.changelog');
rimraf.sync('../../*.log');

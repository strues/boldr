import path from 'path';
import shell from 'shelljs';
import glob from 'glob';
import logger from 'boldr-utils/lib/logger';

import paths from '../config/paths';

module.exports = (config, flags) => {
  const eslintrc = glob.sync(`${paths.rootDir}/.*eslintrc*`);
  const configFile = eslintrc.length
    ? eslintrc[0]
    : path.join(__dirname, '../config/eslintrc.base');

  logger.info(`Using ESLint file: ${configFile}`);

  const lint = () => {
    const esLintLibrary = require.resolve('eslint');
    const eslint = esLintLibrary.replace(/(.*)(lib\/api\.js)/, '$1bin/eslint.js'); // eslint-disable-line

    const cmd = `${eslint} src/ -c ${configFile} --color ${flags.join(' ')}`;
    const output = shell.exec(cmd);

    if (output.code === 0) {
      logger.end(
        `Linting complete. ${output.stdout === ''
          ? 'Damn, your code is beautiful  💕'
          : 'Maybe you want to check it over again  😦'}`,
      );
    }
    process.exit(output.code > 0 ? 1 : 0);
  };
  lint();
};

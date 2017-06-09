import path from 'path';
import glob from 'glob';
import stylelint from 'stylelint';
import logger from 'boldr-utils/lib/logger';

import paths from '../config/paths';

module.exports = () => {
  const handleError = error => {
    logger.error(error);
    process.exit(1);
  };

  const stylelintrc = glob.sync(`${paths.rootDir}/.*stylelintrc*`);
  const configFile = stylelintrc.length
    ? stylelintrc[0]
    : path.join(__dirname, '../config/stylelintrc.base');

  logger.info(`Using Stylelint file: ${configFile}`);

  stylelint
    .lint({
      files: [`${paths.sharedDir}/**/*.css`, `${paths.sharedDir}/**/*.scss`],
      formatter: 'string',
      configFile,
    })
    .then(result => {
      if (result.output) {
        handleError(`\n${result.output}`);
      } else {
        logger.end('Looking so damn stylish 🏆');
        process.exit(0);
      }
    })
    .catch(error => {
      handleError(error.stack);
    });
};

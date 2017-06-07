/* eslint-disable func-names */
import chalk from 'chalk';

export default function handleError(task) {
  return async function(args, options) {
    try {
      await task(args, options);
    } catch (error) {
      console.log(chalk.red(`💩  ${error.message}`));
    }
  };
}

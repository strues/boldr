/* eslint-disable comma-dangle */
/*
 * Minimalistic script runner. Usage example:
 *
 *     node scripts/db.js migrate
 *     Starting 'db:migrate'...
 *     Finished 'db:migrate' in 25ms
 *
 */

function run(task, action, ...args) {
  const command = process.argv[2];
  const taskName = command && !command.startsWith('-')
    ? `${task}:${command}`
    : task;
  const start = new Date();
  process.stdout.write(`Starting '${taskName}'...\n`);
  return Promise.resolve().then(() => action(...args)).then(
    () => {
      return process.stdout.write(
        `Finished '${taskName}' after ${new Date().getTime() - start.getTime()}ms\n`
      );
    },
    err => process.stderr.write(`${err.stack}\n`));
}

process.nextTick(() => require.main.exports());
module.exports = (task, action) => run.bind(undefined, task, action);

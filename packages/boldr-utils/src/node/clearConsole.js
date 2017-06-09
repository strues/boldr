/**
 * Clear console scrollback.
 */
module.exports = function clearConsole() {
  // XXX Hack for testing
  // TODO Give users a way to disable console clearing
  if (process.env.BOLDR__TEST) {
    return;
  }
  // This will completely wipe scrollback in cmd.exe on Windows - use cmd.exe's
  // `start` command to launch nwb's dev server in a new prompt if you don't
  // want to lose it.
  process.stdout.write(process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H');
};

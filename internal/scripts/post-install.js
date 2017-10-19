const execSync = require('child_process').execSync;

const exec = (cmd, env) =>
  execSync(cmd, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, env),
  });

exec('lerna bootstrap --stream');

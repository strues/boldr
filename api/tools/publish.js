#!/usr/bin/env node

const cp = require('child_process');
const pkg = require('../package.json');

const host = process.argv[2];
const composeFile = '/usr/src/app/docker-compose.yml';

if (!host) {
  console.log(`Usage:

  node tools/deploy.js <host>

Options:

  --no-up      Do not run 'docker-compose up' after deployment
  --no-prune   Do not run 'docker image prune' after deployment
`);
  process.exit();
}

cp.spawnSync(
  'docker-compose',
  ['run', '--rm', 'api', '/bin/sh', '-c', 'yarn install; yarn run build'],
  { stdio: 'inherit' },
);
cp.spawnSync('docker', ['build', '--no-cache', '--tag', pkg.name, '.'], { stdio: 'inherit' });
const ssh = cp.spawn('ssh', ['-C', host, 'docker', 'load'], {
  stdio: ['pipe', 'inherit', 'inherit'],
});
const docker = cp.spawn('docker', ['save', pkg.name], { stdio: ['inherit', ssh.stdin, 'inherit'] });
docker.on('exit', () => {
  ssh.stdin.end();
});
ssh.on('exit', () => {
  if (process.argv.includes('--no-up')) return;
  cp.spawnSync('ssh', ['-C', host, 'docker-compose', '-f', composeFile, 'up', '-d'], {
    stdio: 'inherit',
  });
  if (process.argv.includes('--no-prune')) return;
  cp.spawnSync('ssh', ['-C', host, 'docker', 'image', 'prune', '-a', '-f'], { stdio: 'inherit' });
});

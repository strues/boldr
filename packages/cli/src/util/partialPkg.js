export default {
  version: '0.0.0',
  main: 'lib/index.js',
  scripts: {
    build: 'NODE_ENV=production boldr build',
    clean: 'boldr clean all',
    dev: 'NODE_ENV=development boldr dev',
    migr: 'boldr migrate',
    start:
      'npm run clean && cross-env NODE_ENV=development GRAPHQL_ENDPOINT=http://localhost:2121/api/v1/graphql node server/index.js',
    'start:prod': 'NODE_ENV=production boldr start:ssr',
  },
  engines: {
    node: '>=8',
  },

  devDependencies: {},
};

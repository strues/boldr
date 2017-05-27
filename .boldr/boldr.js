/* eslint-disable */
const path = require('path');
const dotenv = require('dotenv');
dotenv.load();

module.exports = {
  env: {
    NODE_ENV: process.env.NODE_ENV,
    BOLDR__SERVER_PORT: process.env.BOLDR__SERVER_PORT,
    BOLDR__DEV_PORT: process.env.BOLDR__DEV_PORT,
    BOLDR__DEBUG: process.env.BOLDR__DEBUG,
  },
  server: {
    port: process.env.BOLDR__SERVER_PORT,
    host: '127.0.0.1',
    apiPrefix: '/api/v1',
    siteUrl: 'http://localhost:3000',
  },
  logging: {
    level: 'debug',
    file: {
      enable: true,
      dir: 'logs',
      level: 'info',
      filename: 'boldr.api',
    },
  },
  db: {
    url: 'postgres://postgres:password@127.0.0.1:5432/boldr',
    name: 'boldr',
    debug: false,
  },
  redis: {
    url: 'redis://127.0.0.1:6379',
  },
  token: {
    iss: 'boldr',
    aud: '',
    algorithm: 'HS256',
    secret: 'b0ldrk3kwi11s15',
  },
  mail: {
    host: 'smtp.example',
    port: 465,
    ssl: true,
    user: 'hello@boldr.io',
    password: 'password',
    from: 'hello@boldr.io',
  },
  cors: {
    whitelist: ['http://localhost:2121', 'http://localhost:3000'],
  },
};

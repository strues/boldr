module.exports = {
  websiteUrl: 'http://localhost:3000',
  server: {
    port: 2121,
    protocol: 'http',
    host: '0.0.0.0',
    prefix: '/api/v1',
    uploadDir: 'public/uploads/tmp',
    enableNonce: false,
    enableCSP: false,

  },
  logging: {
    level: 'debug',
    file: false,
  },
  token: {
    secret: 'b0ldrk3kwi11s15',
    expiration: 604800000,
  },
  mail: {
    host: 'smtp.example.com',
    user: 'user@user.com',
    password: 'password',
    port: 465,
    ssl: true,
    from: 'hello@boldr.io',
  },
  db: {
    url: 'postgres://postgres:password@localhost:5432/boldr',
  },
  redis: {
    url: 'redis://127.0.0.1:6379/0',
  },
  paths: {
    publicPath: '/static/',
    entry: {
      server: 'src/serverEntry.js',
      client: 'src/clientEntry.js',
    },
    output: {
      server: 'build/server',
      client: 'build/client',
    },
    vendor: 'src/vendor.js',
  },
  vendor: [],
  tools: {
    profile: false,
  },
}

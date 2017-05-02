const httpProxy = require('http-proxy');

const proxyTarget = 'http://127.0.0.1:2121/api/v1';

const proxy = httpProxy.createProxyServer({
  target: proxyTarget,
  ws: true,
});

module.exports = app => {
  // Proxy to API server
  app.use('/api/v1', (req, res) => {
    proxy.web(req, res, { target: proxyTarget });
  });

  app.use('/uploads/', (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:2121/uploads' });
  });

  proxy.on('error', (error, req, res) => {
    if (error.code !== 'ECONNRESET') {
      console.error('proxy error', error);
    }
    if (!res.headersSent) {
      res.writeHead(500, { 'content-type': 'application/json' });
    }

    const json = {
      error: 'proxy_error',
      reason: error.message,
    };
    res.end(JSON.stringify(json));
  });
};

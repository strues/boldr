const express = require('express');

const app = express();

const clientStats = require('./build/client/stats.json');
const serverRender = require('./build/server/server.js').default;

app.use('/static/', express.static('build/client'));

app.use(serverRender({ clientStats }));

app.listen(3000);

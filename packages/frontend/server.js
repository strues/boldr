const express = require('express');

const app = express();
app.use('/static/', express.static('./build/client'));

const webpackStats = require('./build/client/stats.json');
const serverRender = require('./build/server/main.js').default;

app.use(serverRender({webpackStats}));

app.listen(3000);

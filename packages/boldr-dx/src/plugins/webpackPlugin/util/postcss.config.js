// webpack.config.js
// https://github.com/postcss/postcss-loader/tree/v2.0.5
const path = require('path');

module.exports = loader => {
  return [
    require('postcss-import')(),
    require('postcss-cssnext')({ browsers: ['> 1%', 'last 2 versions'] }),
  ];
};

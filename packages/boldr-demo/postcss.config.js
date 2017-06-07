const path = require('path');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    cssnano({
      autoprefixer: {
        browsers: [
          'safari 9',
          'ie 10-11',
          'last 2 Chrome versions',
          'last 2 Firefox versions',
          'edge 13',
          'ios_saf 9.0-9.2',
          'ie_mob 11',
          'Android >= 4',
        ],
        cascade: false,
        add: true,
        remove: true,
      },
      safe: true,
    }),
  ],
};

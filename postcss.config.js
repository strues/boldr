const path = require('path');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const postcssReporter = require('postcss-reporter');

module.exports = {
  plugins: [
    postcssImport({ path: path.resolve(process.cwd(), './shared/styles') }),
    autoprefixer(),
    postcssReporter({ clearMessages: true }),
  ],
};

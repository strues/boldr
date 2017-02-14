const path = require('path');
const postcssImport = require('postcss-import');
const postcssCssnext = require('postcss-cssnext');
const postcssReporter = require('postcss-reporter');

module.exports = {
  plugins: [
    postcssImport({ path: path.resolve(process.cwd(), './shared/styles') }),
    postcssCssnext({ browsers: ['> 1%', 'last 2 versions'] }),
    postcssReporter({ clearMessages: true }),
  ],
};

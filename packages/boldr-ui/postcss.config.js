const path = require('path');
const postcssImport = require('postcss-import');
const postcssCssnext = require('postcss-cssnext');
const postcssReporter = require('postcss-reporter');

module.exports = {
  plugins: [
    postcssImport({ path: path.resolve(process.cwd(), './src/styles') }),
    postcssCssnext({
      overflowWrap: true,
      rem: false,
      colorRgba: false,
      autoprefixer: {
        browsers: ['> 1%', 'last 2 versions'],
      } }),
    postcssReporter({ clearMessages: true }),
  ],
};

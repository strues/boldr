module.exports = () => ({
  // The list of plugins for PostCSS
  // https://github.com/postcss/postcss
  plugins: [
    require('postcss-import')(),
    require('postcss-discard-comments')(),
    require('postcss-reporter')(),
    require('autoprefixer')(),
  ],
});

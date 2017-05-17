module.exports = {
  plugins: {
    'postcss-import': {},
    autoprefixer: {
      browsers: [
        '>1%',
        'last 2 versions',
      ],
    },
    'postcss-discard-comments': {
      removeAll: true,
    },
    'postcss-reporter': {
      'clear-reported-messages': true,
    }

  },
};

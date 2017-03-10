const styles = {
  name: 'hp-scss',
  loaders: [
    { path: 'style-loader' },
    {
      path: 'css-loader',
      use: {
        importLoaders: 1,
        localIdentName: '[name]__[local]___[hash:base64:5]',
        sourceMap: true,
        modules: true,
      },
    },
    {
      path: 'postcss-loader',
    },
    {
      path: 'sass-loader',
      use: {
        outputStyle: 'expanded',
        sourceMap: true,
      },
    },
  ],
};

export default styles;

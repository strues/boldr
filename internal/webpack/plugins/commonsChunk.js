import webpack from 'webpack';

export default () => new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  children: true,
  minChunks: Infinity,
  async: true,
});

import webpack from 'webpack';
import config from '../../../config';

export default () => new webpack.optimize.UglifyJsPlugin({
  sourceMap: config('incSourceMaps'),
  compress: {
    screw_ie8: true,
    warnings: false,
  },
  mangle: {
    screw_ie8: true,
  },
  output: {
    comments: false,
    screw_ie8: true,
  },
});

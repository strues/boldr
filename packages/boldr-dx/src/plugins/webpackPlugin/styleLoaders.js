import webpack from 'webpack';
import cssnano from 'cssnano';
import _debug from 'debug';

export const sassLoaderConfig = {
  loader: 'sass-loader',
  options: {
    // sourceMap: true,
    outputStyle: 'expanded',
  },
};

export const cssLoaderConfig = {
  loader: 'css-loader',
  options: {
    // sourceMap: true,
    minimize: true,
    modules: true,
    importLoaders: true,
    localIdentName: '[name]__[local]___[hash:base64:5]',
  },
};

export const postCssLoaderConfig = {
  loader: 'postcss-loader',
  options: {
    // sourceMap: true,
    plugins: () => {
      return [
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
      ];
    },
  },
};

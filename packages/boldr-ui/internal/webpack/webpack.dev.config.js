const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const pkg = require('../../package');

module.exports = {
  target: 'web',
  context: path.join(__dirname, '../../'),
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    './dev/index.js'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'dev.js',
    publicPath: '/build/'
  },
  resolve: {
    extensions: ['.js', '.scss', '.json'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [
        path.join(__dirname, '../../src'),
        path.join(__dirname, '../../dev')
      ]
    }, {
      test: /(\.scss|\.css)$/,
      include: /node_modules/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
              modules: false,
              context: path.join(process.cwd(), './src'),
              localIdentName: '[name]__[local].[hash:base64:5]',
              minimize: false,
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
              sourceMapContents: false,
            },
          },
        ],
      }),
    }, {
      test: /(\.scss|\.css)$/,
      include: [
        path.join(__dirname, '../../src'),
        path.join(__dirname, '../../dev')
      ],
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          query: {
            modules: false,
            localIdentName: '[name]__[local]___[hash:base64:5]',
            sourceMap: true
          },
        },
        'postcss-loader',
        {
          loader: 'sass-loader',
          options: {
            outputStyle: 'expanded',
            sourceMap: true,
            sourceMapContents: false,
          },
        },
      ]
    }]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: path.join(__dirname, '../../'),
        // postcss () {
        //   return [
        //     require('postcss-import')({
        //       root: path.join(__dirname, '../'),
        //       path: [path.join(__dirname, '../components')]
        //     }),
        //     require('postcss-mixins')(),
        //     require('postcss-each')(),
        //     require('postcss-cssnext')(),
        //     require('postcss-reporter')({
        //       clearMessages: true
        //     })
        //   ];
        // }
      }
    }),
    new ExtractTextPlugin({ filename: 'dev.css', allChunks: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EvalSourceMapDevToolPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      VERSION: JSON.stringify(pkg.version)
    })
  ]
};

const env = process.env.BABEL_ENV || process.env.NODE_ENV;
const path = require('path');

const plugins = [
  require.resolve('babel-plugin-transform-export-extensions'),
  // @connect()
  // class Foo extends Component
  require.resolve('babel-plugin-transform-decorators-legacy'),
  // class { handleClick = () => { } }
  require.resolve('babel-plugin-transform-class-properties'),
  require.resolve('babel-plugin-dynamic-import-webpack'),
  // { ...param, completed: true }
  [require.resolve('babel-plugin-transform-object-rest-spread'), {
    useBuiltIns: true
  }],
  require.resolve('babel-plugin-transform-react-jsx'),
  require.resolve('babel-plugin-transform-flow-strip-types'),
  require.resolve('babel-plugin-transform-react-display-name'),
  require.resolve('babel-plugin-syntax-trailing-function-commas'),
  [require.resolve('babel-plugin-transform-regenerator'), {
    async: false
  }],
  [require.resolve('babel-plugin-transform-runtime'), {
    helpers: false,
    polyfill: false,
    regenerator: true,
    // Resolve the Babel runtime relative to the config.
    moduleName: path.dirname(require.resolve('babel-runtime/package'))
  }]
]

if (env === 'development' || env === 'test') {
  // The following two plugins are currently necessary to make jsx developer
  // friendly messages, if you wondering why it is added here separately rather
  // it comes with babel-preset-react see the below threads for more info
  // https://github.com/babel/babel/issues/4702
  // https://github.com/babel/babel/pull/3540#issuecomment-228673661
  // https://github.com/facebookincubator/create-react-app/issues/989
  plugins.push.apply(plugins, [
    // Adds component stack to warning messages
    require.resolve('babel-plugin-transform-react-jsx-source'),
    // Adds __self attribute to JSX which React will use for some warnings
    require.resolve('babel-plugin-transform-react-jsx-self'),
   ]);
};

module.exports = function(context, opts) {
  let config;
  require.resolve('babel-preset-latest');

  if (env === 'test') {
     config = {
      presets: [
        require.resolve('babel-preset-latest'),
        // JSX, Flow
        require.resolve('babel-preset-react')
      ],
      plugins: plugins
    };
  } else {
    config = {
      compact: false,
      presets: [
        // Latest stable ECMAScript features
        ['latest', opts],
        // JSX, Flow
        require.resolve('babel-preset-react')
      ],
      plugins: plugins
    };

    if (env === 'production') {
      plugins.push.apply(plugins, [
        require.resolve('babel-plugin-transform-flow-strip-types'),
      ]);
    }
  }

  return config;
}

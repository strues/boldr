// Boldr Webpack Plugins
//
// These plugin definitions provide you with advanced hooks into customising
// the project without having to reach into the internals of the tools.
//
// We have decided to create this plugin approach so that you can come to
// a centralised configuration folder to do most of your application
// configuration adjustments.  Additionally it helps to make merging
// from the origin starter kit a bit easier.
import type { BuildOptions } from '../../tools/types';

export default {
  // Plugins for the bundles/bundling process.
  bundles: {
    babelConfig: (buildOptions : BuildOptions) => {
      const { target, mode } = buildOptions;

      return {
        babelrc: false,
        compact: true,
        sourceMaps: true,
        comments: false,
        presets: [
          // JSX
          'react',
          target === 'client'
            ? ['boldr', { es2015: { modules: false } }]
            : null,
          target === 'server'
            ? ['env', { targets: { node: true }, modules: false }]
            : null,
        ].filter(x => x != null), // eslint-disable-line
        plugins: [
          // Required to support react hot loader.
          mode === 'development'
            ? 'react-hot-loader/babel'
            : null,
          'transform-object-rest-spread',
          'transform-es2015-destructuring',
          'transform-decorators-legacy',
          'transform-class-properties',
          mode === 'development'
            ? 'transform-react-jsx-self'
            : null,
          mode === 'development'
            ? 'transform-react-jsx-source'
            : null,
          ['module-resolver', {
            root: ['./src/common'],
          }],
        ].filter(x => x != null), // eslint-disable-line
      };
    },

    webpackConfig: (config: Object, buildOptions) => {
      const { target, mode } = buildOptions; // eslint-disable-line no-unused-vars

      // Example:
      /*
      if (target === 'server' && mode === 'development') {
        config.plugins.push(new MyCoolWebpackPlugin());
      }
      */

      // Debugging/Logging Example:
      /*
      if (target === 'server') {
        console.log(JSON.stringify(config, null, 4));
      }
      */

      return config;
    },

  },
};

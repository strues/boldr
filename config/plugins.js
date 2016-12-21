// Boldr Webpack Plugins
//
// These plugin definitions provide you with advanced hooks into customising
// the project without having to reach into the internals of the tools.
//
// We have decided to create this plugin approach so that you can come to
// a centralised configuration folder to do most of your application
// configuration adjustments.  Additionally it helps to make merging
// from the origin starter kit a bit easier.
import uniq from 'lodash/uniq';
import pullAll from 'lodash/pullAll';
import type { BuildOptions } from '../tools/types';
import boldrConfig from './boldr';

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
          'stage-0',
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
    devVendorDLL: {
      entry(pkg) {
        const dependencyNames = Object.keys(pkg.dependencies);
        const exclude = pkg.dll.exclude || boldrConfig.bundles.client.devVendorDLL.exclude;
        const include = pkg.dll.include || boldrConfig.bundles.client.devVendorDLL.include;
        const includeDependencies = uniq(dependencyNames.concat(include));

        return {
          boldrDLLs: pullAll(includeDependencies, exclude),
        };
      },
    },
    webpackConfig: (config: Object, buildOptions) => {
      const { target, mode } = buildOptions; // eslint-disable-line no-unused-vars

      return config;
    },

  },
};

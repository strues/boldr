import babel from 'rollup-plugin-babel';
import cjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';
import replace from 'rollup-plugin-replace';

export default {
  moduleName: 'BoldrCore',

  entry: 'src/index.js',

  sourceMap: true,
  external: [
    'react',
    'react-dom',
    'react-router-redux',
    'redux-thunk',
    'redux',
    'apollo-client',
    'redux-batched-actions',
    'invariant',
  ],
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  targets: [
    { dest: './lib/boldr-core.es.js', format: 'es' },
    { dest: './lib/boldr-core.js', format: 'umd' },
  ],
  plugins: [
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        [
          'boldr/browser',
          {
            modules: false,
            exclude: ['transform-regenerator', 'transform-async-to-generator'],
          },
        ],
      ],
    }),

    cjs({
      include: 'node_modules/**',
    }),
    resolve({}),
  ],
};

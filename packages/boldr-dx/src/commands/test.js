import path from 'path';
import jest from 'jest';
import pathExists from 'path-exists';

module.exports = (config, flags) => {
  // set BABEL_ENV to test if undefined
  process.env.BABEL_ENV = process.env.BABEL_ENV || 'test';
  // Run Jest
  const argv = process.argv.slice(2);

  // Watch unless on CI
  if (!process.env.CI) {
    argv.push('--watch');
  }

  const rootDir = process.cwd();
  const setupTestsFile = pathExists.sync(path.resolve(rootDir, './.boldr/setupTests.js'))
    ? '<rootDir>/.boldr/setupTests.js'
    : undefined;

  argv.push(
    '--config',
    JSON.stringify({
      rootDir,
      moduleFileExtensions: ['jsx', 'js', 'json'],
      moduleNameMapper: {
        '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': require.resolve(
          '../config/jest/fileMock.js',
        ),
        '\\.(css|scss)$': require.resolve('identity-obj-proxy'),
      },
      transform: {
        '.js': require.resolve('../config/jest/transform.js'),
      },
      setupFiles: [
        /* require.resolve('./jest/polyfills.js') */
      ],
      snapshotSerializers: [require.resolve('enzyme-to-json')],
      setupTestFrameworkScriptFile: setupTestsFile,
      testRegex: '.*.test\\.js',
      testPathIgnorePatterns: [
        '<rootDir>/(lib|internal|config|docs|dist|bin|.idea|public|db)/',
        '__snapshots__',
        '/styles/',
      ],
      transformIgnorePatterns: ['/node_modules/', '/styles/'],
    }),
  );

  jest.run(argv);
};

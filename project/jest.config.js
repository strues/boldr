module.exports = {
  verbose: true,
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      './internal/jest/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules', 'src', 'server'],
  testPathIgnorePatterns: ['/node_modules/', '/__fixtures__/', '/__snapshots__/', '/flow-typed/'],
  testEnvironment: 'jsdom',
  setupTestFrameworkScriptFile: './node_modules/jest-enzyme/lib/index.js',
  setupFiles: ['raf/polyfill', './internal/jest/setup.js'],
  transform: {
    '^.+\\.jsx?$': './internal/jest/transform.js',
    '\\.(gql|graphql)$': 'jest-transform-graphql',
  },
  collectCoverage: false,
  collectCoverageFrom: [
    'src',
    '!src/clientEntry.js',
    '!src/serverEntry.js',
    '!src/theme/*.js',
    '!**/index.js',
  ],
  coveragePathIgnorePatterns: ['/flow-typed/', '/__fixtures__/', '/internal/'],
  coverageDirectory: 'coverage',
};

module.exports = {
  cacheDirectory: '.boldr/cache/jest',
  clearMocks: true,
  testRegex: '.*.test\\.js',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      './internal/jest/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  roots: [
    '<rootDir>/packages/auth',
    '<rootDir>/packages/core',
    '<rootDir>/packages/frontend',
    '<rootDir>/packages/utils',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/(internal|build|.boldr|docs|bin|.idea|public)/',
    '__snapshots__',
  ],
  testEnvironment: 'jsdom',
  setupTestFrameworkScriptFile: './internal/jest/setup.js',
  transform: {
    '^.+\\.jsx?$': './internal/jest/transform.js',
    '\\.(gql|graphql)$': 'jest-transform-graphql',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'packages/auth/src/**/*.js',
    'packages/core/src/**/*.js',
    'packages/frontend/src/**/*.js',
    'packages/utils/src/**/*.js',
    '!packages/tools/**',
    '!packages/server/**',
    '!packages/cli/**',
  ],
  coveragePathIgnorePatterns: [
    '/(internal|.boldr|docs|bin|.idea|public|build)/',
    '/flow-typed/',
    '/__fixtures__/',
    '/node_modules/',
  ],
  coverageDirectory: 'coverage'
};

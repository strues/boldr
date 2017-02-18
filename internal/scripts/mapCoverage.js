const createReporter = require('istanbul-api').createReporter;
const istanbulCoverage = require('istanbul-lib-coverage');
const coverage = require('../../coverage/coverage-final.json');

const map = istanbulCoverage.createCoverageMap();
const reporter = createReporter();

const envs = ['node', 'browser'];

envs.forEach(en => {
  const coverage = require(`../../coverage/${en}/coverage-final.json`);
  Object.keys(coverage).forEach(
    filename => map.addFileCoverage(coverage[filename]),
  );
});

reporter.addAll(['json', 'lcov', 'text']);
reporter.write(map);

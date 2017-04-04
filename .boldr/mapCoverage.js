'use strict';

var createReporter = require('istanbul-api').createReporter;
var istanbulCoverage = require('istanbul-lib-coverage');
var coverage = require('../coverage/coverage-final.json');

var map = istanbulCoverage.createCoverageMap();
var reporter = createReporter();

var envs = ['node', 'browser'];

envs.forEach(function (en) {
  var coverage = require('../coverage/' + en + '/coverage-final.json');
  Object.keys(coverage).forEach(function (filename) {
    return map.addFileCoverage(coverage[filename]);
  });
});

reporter.addAll(['json', 'lcov', 'text']);
reporter.write(map);
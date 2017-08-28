const removeByKey = require('./objects/removeByKey');
const filterEmpty = require('./objects/filterEmpty');
const ifElse = require('./logic/ifElse');
const sort = require('./logic/sort');
const uniq = require('./logic/uniq');
const isPromise = require('./logic/isPromise');
const flatten = require('./arrays/flatten');
const addIdToArray = require('./arrays/addIdToArray');
const removeIdFromArray = require('./arrays/removeIdFromArray');
const merge = require('./arrays/merge');
const removeNil = require('./arrays/removeNil');
const logger = require('./logger');

module.exports = {
  isPromise,
  removeNil,
  logger,
  flatten,
  onlyIf,
  addIdToArray,
  removeIdFromArray,
  removeEmpty,
  ifElse,
  removeByKey,
  sort,
  uniq,
  filterEmpty,
  merge,
};

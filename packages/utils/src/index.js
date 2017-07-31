const mergeDeep = require('./objects/mergeDeep');
const removeByKey = require('./objects/removeByKey');
const getField = require('./objects/getField');
const filterEmpty = require('./objects/filterEmpty');
const ifElse = require('./logic/ifElse');
const requiredParam = require('./logic/requiredParam');
const validateId = require('./logic/validateId');
const sort = require('./logic/sort');
const uniq = require('./logic/uniq');
const isPromise = require('./logic/isPromise');
const onlyIf = require('./logic/onlyIf');
const flatten = require('./arrays/flatten');
const removeEmpty = require('./arrays/removeEmpty');
const addIdToArray = require('./arrays/addIdToArray');
const removeIdFromArray = require('./arrays/removeIdFromArray');
const removeKeyFromNestedArray = require('./arrays/removeKeyFromNestedArray');
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
  removeKeyFromNestedArray,
  removeEmpty,
  ifElse,
  requiredParam,
  mergeDeep,
  removeByKey,
  sort,
  uniq,
  getField,
  filterEmpty,
  merge,
};

const filterWithRules = require('./objects/filterWithRules');
const mergeDeep = require('./objects/mergeDeep');
const getIn = require('./objects/getIn');
const setIn = require('./objects/setIn');
const removeByKey = require('./objects/removeByKey');
const getField = require('./objects/getField');

const filterEmpty = require('./objects/filterEmpty');
const ifElse = require('./logic/ifElse');
const requiredParam = require('./logic/requiredParam');
const validateId = require('./logic/validateId');
const sort = require('./logic/sort');
const uniq = require('./logic/uniq');
const isPromise = require('./logic/isPromise');
const typeOf = require('./logic/typeOf');

const flatten = require('./arrays/flatten');
const addIdToArray = require('./arrays/addIdToArray');
const removeIdFromArray = require('./arrays/removeIdFromArray');
const removeKeyFromNestedArray = require('./arrays/removeKeyFromNestedArray');
const stringifiedArray = require('./arrays/stringifiedArray');
const validateArray = require('./arrays/validateArray');
const merge = require('./arrays/merge');
const removeNil = require('./arrays/removeNil');
const joinAnd = require('./arrays/joinAnd');
const reduceKey = require('./state/reduceKey');
const logger = require('./logger');

module.exports = {
  isPromise,
  removeNil,
  logger,
  flatten,
  addIdToArray,
  removeIdFromArray,
  removeKeyFromNestedArray,
  stringifiedArray,
  validateArray,
  ifElse,
  requiredParam,
  validateId,
  filterWithRules,
  mergeDeep,
  getIn,
  setIn,
  removeByKey,
  sort,
  uniq,
  reduceKey,
  getField,
  filterEmpty,
  merge,
  joinAnd,
  typeOf,
};

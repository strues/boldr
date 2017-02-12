import { loadRoute, errorLoading } from './routeHelpers';
import { sort, uniq } from './lists';
import { filterWithRules, mergeDeep, getIn, setIn, removeByKey } from './objects';
import { ifElse, onlyIf, requiredParam, validateId } from './logic';
import {
  removeNil,
  flatten,
  addIdToArray,
  removeIdFromArray,
  removeKeyFromNestedArray,
  stringifiedArray,
  validateArray,
} from './arrays';

export {
  loadRoute,
  errorLoading,
  removeNil,
  flatten,
  addIdToArray,
  removeIdFromArray,
  removeKeyFromNestedArray,
  stringifiedArray,
  validateArray,
  sort,
  uniq,
  ifElse,
  onlyIf,
  requiredParam,
  validateId,
  filterWithRules,
  mergeDeep,
  getIn,
  setIn,
  removeByKey,
};

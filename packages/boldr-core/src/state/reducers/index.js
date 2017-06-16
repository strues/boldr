/**
 * @module boldr-core/lib/state/reducers
 * @see module:boldr-core/lib/state/reducers/collectionsReducers
 * @see module:boldr-core/lib/state/reducers/componentsReducers
 * @see module:boldr-core/lib/state/reducers/settingsReducers
 */
import { combineReducers } from 'redux';

import collectionsReducers from './collectionsReducers';
import { componentsReducers } from './componentsReducers';
import { settingsReducers } from './settingsReducers';

/**
 * exported API
 * @type {object}
 * @example
 * import reducer from 'boldr-core/lib/state/reducers';
 */
export default combineReducers({
  collections: collectionsReducers,
  components: componentsReducers,
  settings: settingsReducers,
});

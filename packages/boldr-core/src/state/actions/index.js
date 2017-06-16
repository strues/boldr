/**
 * @module boldr-core/lib/state/actions
 * @see module:boldr-core/lib/state/actions/collectionsActions
 * @see module:boldr-core/lib/state/actions/componentsActions
 * @see module:boldr-core/lib/state/actions/settingsActions
 */
import * as collectionsActions from './collectionsActions';
import * as componentsActions from './componentsActions';
import * as settingsActions from './settingsActions';
import http from './http';

/**
 * exported API
 * @example
  import {
  collectionsActions,
  componentsActions,
  settingsActions
  } from 'boldr-core/lib/state/actions';
 * @type {Object}
 */
export default {
  collectionsActions,
  componentsActions,
  settingsActions,
  http,
};

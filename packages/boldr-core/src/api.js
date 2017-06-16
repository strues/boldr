/**
 * this module define a high level API to handle common tasks
 * {action,router,registry}
 * @module boldr-core/lib/api
 * @see module:boldr-core/lib/framework/registry
 * @see module:boldr-core/lib/framework/route
 * @see module:boldr-core/lib/framework/action
 */

import registry from './framework/registry';
import route from './framework/route';
import action from './framework/action';

export default {
  action,
  route,
  registry,
};

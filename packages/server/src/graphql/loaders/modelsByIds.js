/**
 * Given a Model, returns a function that can be used as a dataloader resolver
 */
import _debug from 'debug';

const debug = _debug('boldr:server:gql:loaders:modelsByIds');

export default Model => async ids => {
  const records = await Model.query().whereIn('id', ids);
  debug(records);
  /**
   * There may be ids that didn't return a user.
   * We need to map ids to users by iterating over ids and return the corresponding user, or null.
   * To decrease lookup time, remove user from users array each time one was found.
   */

  return ids.map(id => {
    debug(id);
    const indexOfRecord = records.findIndex(record => record.id === id);
    debug(indexOfRecord);
    if (indexOfRecord === -1) {
      return null;
    } else {
      const [record] = records.splice(indexOfRecord, 1);
      return record;
    }
  });
};

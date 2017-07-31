/**
 * Filters and returns only unique properties
 * @param  {array} list [description]
 * @param  {[type]} key  [description]
 * @return {[type]}      [description]
 */
module.exports = function uniq(list, key) {
  const filtered = [];
  const found = {};
  list.forEach(item => {
    if (!found[item[key]]) {
      found[item[key]] = true;
      filtered.push(item);
    }
  });

  return filtered;
};

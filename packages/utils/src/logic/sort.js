/**
 * This function sorts an array by key
 * @param  {array} arr       the array we're going to sorts
 * @param  {string} key       the key we're using to sort by
 * @param  {boolean} ascending true ascending, false if descending
 * @return {array}           the sorted list
 */
module.exports = function sort(arr, key, ascending) {
  const list = arr.slice();
  const multiplier = ascending ? 1 : -1;

  list.sort((prev, curr) => {
    const v1 = prev[key];
    const v2 = curr[key];

    if (typeof v1 === 'number') {
      return v1 < v2 ? 1 : -1;
    }

    return v1.localeCompare(v2) * multiplier;
  });

  return list;
};

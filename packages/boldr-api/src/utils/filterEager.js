function filterEagerData(queryParams, relation, columnName) {
  /* istanbul ignore next */
  if (!queryParams.where) {
    return () => undefined;
  }
  const opMap = {
    gt: '>',
    lt: '<',
    eq: '=',
  };
  // construct the keys that are in where condition in query parameters
  const keys = Object.keys(opMap).map(op => `${relation}.${columnName}:${op}`);
  /* istanbul ignore next */
  const values = keys
    .map(key => {
      const value = queryParams.where[key];
      if (value !== undefined) {
        const opMarker = key.split(':')[1];
        /* istanbul ignore next */
        return {
          op: opMap[opMarker],
          value,
        };
      }
      return null;
    })
    .filter(key => key !== null);
  /* istanbul ignore next */
  return function filterEagerValues(builder) {
    return values.reduce(
      (memo, value) => {
        return memo.where(columnName, value.op, value.value);
      },
      builder,
    );
  };
}

export default filterEagerData;

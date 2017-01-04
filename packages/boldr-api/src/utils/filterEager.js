function filterEagerData(queryParams, relation, columnName) {
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

  const values = keys
    .map(key => {
      const value = queryParams.where[key];
      if (value !== undefined) {
        const opMarker = key.split(':')[1];
        return {
          op: opMap[opMarker],
          value,
        };
      }
      return null;
    })
    .filter(key => key !== null);

  return function filterEagerValues(builder) {
    return values.reduce((memo, value) => {
      return memo.where(columnName, value.op, value.value);
    }, builder);
  };
}

export default filterEagerData;

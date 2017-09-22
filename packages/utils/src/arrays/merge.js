module.exports = function merge(a, b) {
  const typeA = Array.isArray(a) ? 'array' : typeof a;
  const typeB = Array.isArray(b) ? 'array' : typeof b;

  if (typeA !== typeB || typeA === 'undefined') {
    return b;
  }

  if (typeB === 'undefined') {
    return a;
  }

  if (typeA === 'object') {
    const merged = { ...a };

    for (const k of Object.keys(b)) {
      merged[k] = merge(a[k], b[k]);
    }

    return merged;
  } else if (typeA === 'array') {
    return a.concat(b);
  }

  return b;
};

function processQuery(req, res, next) {
  /* istanbul ignore next */
  function getPagination(pageVal) {
    const page = pageVal || {};
    /* istanbul ignore next */
    return {
      number: page.number || 0,
      size: page.size || 10,
    };
  }
  /* istanbul ignore next */
  function getOrder(sort) {
    const sortObj = {};
    /* istanbul ignore next */
    if (sort) {
      sortObj.by = sort.startsWith('-') ? sort.slice(1) : sort;
      sortObj.order = sort.startsWith('-') ? 'desc' : 'asc';
      /* istanbul ignore next */
    } else {
      sortObj.order = 'id';
      sortObj.order = 'desc';
    }
    /* istanbul ignore next */
    return sortObj;
  }
  req.query.page = getPagination(req.query.page);
  req.query.sort = getOrder(req.query.sort);
  next();
}

export default processQuery;

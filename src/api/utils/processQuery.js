function processQuery(req, res, next) {
  function getPagination(pageVal) {
    const page = pageVal || {};
    return {
      number: page.number || 0,
      size: page.size || 10,
    };
  }
  function getOrder(sort) {
    const sortObj = {};
    if (sort) {
      sortObj.by = sort.startsWith('-') ? sort.slice(1) : sort;
      sortObj.order = sort.startsWith('-') ? 'desc' : 'asc';
    } else {
      // default
      sortObj.order = 'id';
      sortObj.order = 'desc';
    }
    return sortObj;
  }
  req.query.page = getPagination(req.query.page);
  req.query.sort = getOrder(req.query.sort);
  next();
}

export default processQuery;

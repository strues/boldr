import findQuery from 'objection-find';
import { filterEagerData, throwNotFound } from 'utils/index';
import responseHandler from '../response/responseHandler';

function getParameterFilters(req, filterProperties) {
  let paramFilter;
  if (filterProperties) {
    paramFilter = {};
    filterProperties.forEach((item) => {
      paramFilter[item.prop] = Number(req.params[item.prop]);
    });
  }
  return paramFilter;
}

async function isValidData(req, additionalProperties) {
  const data = additionalProperties.filter(value => value.checkExistence);
  try {
    const props = await Promise.map(data, (item) => {
      return item.model.query()
        .findById(Number(req.params[item.prop]));
    });
    if (props.some(item => item === undefined || item === null)) {
      return false;
    }
    return true;
  } catch (e) {
    /* handle error */
    return new Error('Error in looking up resources');
  }
}

function getAdditionalProperties(req, data) {
  const additionalProperties = {};
  data
    .filter(item => item.include)
    .forEach((item) => {
      additionalProperties[item.prop] = Number(req.params[item.prop]);
    });
  return additionalProperties;
}
/* istanbul ignore */
class BaseController {
  constructor(model, id, data) {
    this.model = model;
    this.id = id;
    if (data) {
      this.additionalProperties = data.additionalProperties;
      this.userField = data.userField;
      this.filterEager = data.filterEager;
    }
  }
  async create(req, res) {
    let data = req.body;
    if (this.additionalProperties) {
      if (await isValidData(req, this.additionalProperties)) {
        data = Object.assign({}, data, getAdditionalProperties(req, this.additionalProperties));
      } else {
        return throwNotFound(res);
      }
    }

    if (this.userField) {
      if (req.user) {
        data[this.userField] = req.user.id;
      }
    }

    return this.model.query()
      .insert(data)
      .then(item => responseHandler(res, 201, item))
      .catch(err => res.status(500).json(err));
  }

  update(req, res) {
    return this.model.query()
      .patchAndFetchById(req.params[this.id], req.body)
      .then(item => responseHandler(res, 200, item))
    .catch(err => res.status(500).json(err));
  }

  index(req, res, next) {
    const query = findQuery(this.model)
      .build(req.query.where)
      .skipUndefined()
      .where(getParameterFilters(req, this.additionalProperties))
      .eager(req.query.include)
      .orderBy(req.query.sort.by, req.query.sort.order)
      .page(req.query.page.number, req.query.page.size);

    if (this.filterEager) {
      this.filterEager.reduce((memo, data) => {
        return query.filterEager(data.relation,
            filterEagerData(req.query, data.table, data.property));
      }, query);
    }

    query
      .then(items => {
        return responseHandler(res, 200, items);
      })
      .catch(err => {
        return next(err);
      });
  }

  show(req, res) {
    return this.model.query()
      .skipUndefined()
      .findById(req.params[this.id])
      .where(getParameterFilters(req, this.additionalProperties))
      .eager(req.query.eager)
      .then((item) => {
        if (!item) return throwNotFound(res);
        return responseHandler(res, 200, item);
      })
    .catch(err => res.status(500).json(err));
  }

  destroy(req, res) {
    return this.model.query()
      .deleteById(req.params[this.id])
      .then(() => responseHandler(res, 204))
      .catch(err => res.status(500).json(err));
  }
}

export default BaseController;

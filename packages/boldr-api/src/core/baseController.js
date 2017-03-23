/* @flow */
// types
import type { $Response, $Request, NextFunction } from 'express';
import type { Model, Id } from 'objection';
// externals
import findQuery from 'objection-find';
import Promise from 'bluebird';
// locals
import * as utilities from '../utils/transform';
import filterEagerData from '../utils/filterEager';

function getParameterFilters(req: $Request, filterProperties: Object) {
  let paramFilter;
  if (filterProperties) {
    paramFilter = {};
    filterProperties.forEach(item => {
      paramFilter[item.prop] = Number(req.params[item.prop]);
    });
  }
  return paramFilter;
}

async function isValidData(req: $Request, additionalProperties: Object) {
  const data = additionalProperties.filter(value => value.checkExistence);
  try {
    const props = await Promise.map(data, item => {
      return item.model.query().findById(Number(req.params[item.prop]));
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
  data.filter(item => item.include).forEach(item => {
    additionalProperties[item.prop] = Number(req.params[item.prop]);
  });
  return additionalProperties;
}

class BaseController {
  constructor(model: Model, id: Id, data: Object) {
    (this: any).model = model;
    (this: any).id = id;
    if (data) {
      (this: any).additionalProperties = data.additionalProperties;
      (this: any).userField = data.userField;
      (this: any).filterEager = data.filterEager;
    }
  }

  async create(req: $Request, res: $Response) {
    let data = req.body;
    if (this.additionalProperties) {
      if (await isValidData(req, (this: any).additionalProperties)) {
        // $FlowIssue
        data = Object.assign({}, data, getAdditionalProperties(req, (this: any).additionalProperties));
      } else {
        return utilities.throwNotFound(res);
      }
    }

    if (this.userField) {
      if (req.user) {
        // $FlowIssue
        data[this.userField] = req.user.id;
      }
    }

    return (this: any).model
      .query()
      .insert(data)
      .then(item => utilities.responseHandler(null, res, 201, item))
      .catch(err => utilities.responseHandler(err, res));
  }

  update(req: $Request, res: $Response) {
    return (this: any).model
      .query()
      .patchAndFetchById(req.params[(this: any).id], req.body)
      .then(item => utilities.responseHandler(null, res, 200, item))
      .catch(err => utilities.responseHandler(err, res));
  }

  index(req: $Request, res: $Response) {
    const query = findQuery((this: any).model)
      .build(req.query.where)
      .skipUndefined()
      .where(getParameterFilters(req, (this: any).additionalProperties))
      .eager(req.query.include)
      // $FlowIssue
      .orderBy(req.query.sort.by, req.query.sort.order)
      // $FlowIssue
      .page(req.query.page.number, req.query.page.size);

    if (this.filterEager) {
      (this: any).filterEager.reduce(
        (memo, data) => {
          return query.filterEager(data.relation, filterEagerData(req.query, data.table, data.property));
        },
        query,
      );
    }

    query
      .then(items => utilities.responseHandler(null, res, 200, items))
      .catch(err => utilities.responseHandler(err, res));
  }

  show(req: $Request, res: $Response) {
    return (this: any).model
      .query()
      .skipUndefined()
      .findById(req.params[(this: any).id])
      .where(getParameterFilters(req, (this: any).additionalProperties))
      .eager(req.query.eager)
      .then(item => {
        if (!item) return utilities.throwNotFound(res);
        return utilities.responseHandler(null, res, 200, item);
      })
      .catch(err => utilities.responseHandler(err, res));
  }

  destroy(req: $Request, res: $Response) {
    return (this: any).model
      .query()
      .deleteById(req.params[(this: any).id])
      .then(() => utilities.responseHandler(null, res, 204))
      .catch(err => utilities.responseHandler(err, res));
  }
}

export default BaseController;

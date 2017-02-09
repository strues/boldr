/* eslint-disable id-match */
import _ from 'lodash';
import { Model, ValidationError } from 'objection';
import appRootDir from 'app-root-dir';
import BaseQueryBuilder from '../utils/queryBuilder';

/**
 * @class BaseModel
 * @extends Model
 */
class BaseModel extends Model {

  // http://vincit.github.io/objection.js/#defaulteageralgorithm
  static defaultEagerAlgorithm = Model.JoinEagerAlgorithm;
  /**
   * If we should update the created_at attribute when inserted and the updated_at attribute when updated.
   *
   * @type {boolean}
   */
  static addTimestamps = true;
  /**
   * An object of attribute names with function values to transform attributes on the model if they exist.
   *
   * @type {object}
   */
  static transforms = {};

  /**
   * An array of attribute names that will be excluded from being returned.
   *
   * @type {array}
   */
  static hidden = [];
  static softDelete = false;

  static get systemColumns() {
    const columns = [];
    if (this.timestamps) {
      columns.push('created_at');
      columns.push('updated_at');
    }

    if (this.softDelete) {
      columns.push(this.softDeleteColumn);
    }

    return columns;
  }


  /**
    Person.query().where('id', 1).delete();
    // restore a soft deleted model
    Person.query().where('id', 1).restore();
    // get all persons (except deleted ones)
    Person.query();
    // get all persons (including deleted ones)
    Person.query().withTrashed();
    // get only deleted persons
    Person.query().onlyTrashed();
    // delete a person from the database
    Person.query().forceDelete();
   */

  static get softDeleteColumn() {
    if (_.isString(this.softDelete)) {
      return this.softDelete;
    }

    return 'deleted_at';
  }

  static _getModelClass(model) {
    if (!_.isString(model)) return model;

    let modelClass;
    if (_.startsWith(model, '.') || _.startsWith(model, '/')) {
      modelClass = require(model);
    } else {
      modelClass = require(`${appRootDir.get()}/server/models/${model}`);
    }

    return modelClass.default || modelClass;
  }

  /**
   * Ran before inserting into the database.
   */
  $beforeInsert() {
    if (this.constructor.addTimestamps) {
      this.created_at = new Date().toISOString();
      this.updated_at = new Date().toISOString();
    }
  }

  /**
   * Ran before updating the database.
   */
  $beforeUpdate() {
    if (this.constructor.timestamps) {
      this.updated_at = new Date().toISOString();
    }
  }

  $beforeDelete(context) {
    super.$beforeDelete(context);
  }
  /**
   * Ran after querying the database and transforming to the Model.
   *
   * @param {object} json
   * @returns {object}
   */
  $parseDatabaseJson(json) {
    json = super.$parseDatabaseJson.call(this, json);

    Object.keys(this.constructor.transforms).forEach((key) => {
      if (json.hasOwnProperty(key)) {
        json[key] = this.constructor.transforms[key](json[key]);
      }
    });

    this.constructor.hidden.forEach((hidden) => {
      if (json.hasOwnProperty(hidden)) {
        delete json[hidden];
      }
    });

    return json;
  }
}

BaseModel.QueryBuilder = BaseQueryBuilder;

export default BaseModel;

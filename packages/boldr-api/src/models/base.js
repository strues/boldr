/* eslint-disable id-match */
import { Model, ValidationError } from 'objection';
import { snakeCase, camelCase, mapKeys } from 'lodash';

/**
 * @class BaseModel
 * @extends Model
 */
class BaseModel extends Model {
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
    if (this.constructor.addTimestamps) {
      this.updated_at = new Date().toISOString();
    }
  }

  /**
   * Converts camelCase to snake_case for database insertion. This way
   * the data sends to the client camelCased.
   * @method $formatDatabaseJson
   * @param  {[type]}            json [description]
   * @return [type]                   [description]
   */
  $formatDatabaseJson(json) {
    json = super.$formatDatabaseJson(json);
    return mapKeys(json, (value, key) => snakeCase(key));
  }

  /**
   * Ran after querying the database and transforming to the Model.
   *
   * @param {object} json
   * @returns {object}
   */
  $parseDatabaseJson(json) {
    // Convert the data to camelCase before sending.
    json = mapKeys(json, (value, key) => camelCase(key));
    super.$parseDatabaseJson(json);
    
    Object.keys(this.constructor.transforms).forEach(key => {
      if (json.hasOwnProperty(key)) {
        json[key] = this.constructor.transforms[key](json[key]);
      }
    });

    this.constructor.hidden.forEach(hidden => {
      if (json.hasOwnProperty(hidden)) {
        delete json[hidden];
      }
    });

    return json;
  }

  async reload() {
    const model = await this.$query();
    Object.assign(this, model);
    return this;
  }
}

export default BaseModel;

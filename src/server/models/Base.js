/* eslint-disable id-match */
import { Model, ValidationError } from 'objection';

/**
 * @class BaseModel
 * @extends Model
 */
class BaseModel extends Model {
  /**
   * If we should update the createdAt attribute when inserted and the
   * updatedAt attribute when updated.
   *
   * @type {boolean}
   */
  static addTimestamps = true;
  /**
   * An object of attribute names with function values to transform
   * attributes on the model if they exist.
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
      this.createdAt = new Date().toISOString();
      this.updatedAt = new Date().toISOString();
    }
  }

  /**
   * Ran before updating the database.
   */
  $beforeUpdate() {
    if (this.constructor.addTimestamps) {
      this.updatedAt = new Date().toISOString();
    }
  }
  /**
   * Ran after querying the database and transforming to the Model.
   *
   * @param {object} json
   * @returns {object}
   */
  $parseDatabaseJson(json) {
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

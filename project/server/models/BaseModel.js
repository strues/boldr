/* eslint-disable no-prototype-builtins, complexity */
import { Model, ValidationError } from 'objection';

import isString from 'lodash/isString';
import camelCase from 'lodash/camelCase';
import mapKeys from 'lodash/mapKeys';
import snakeCase from 'lodash/snakeCase';
import memoize from 'lodash/memoize';
import BaseQueryBuilder from './queryBuilder';

const toCamelCase = memoize(camelCase);
const toSnakeCase = memoize(snakeCase);

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

  // Centralize the models.
  static modelPaths = [__dirname];

  // http://vincit.github.io/objection.js/#defaulteageralgorithm
  static defaultEagerAlgorithm = Model.JoinEagerAlgorithm;

  static get softDeleteColumn() {
    if (isString(this.softDelete)) {
      return this.softDelete;
    }

    return 'deleted_at';
  }

  static where(...args) {
    return this.query().where(...args);
  }

  static find(...args) {
    return this.query().find(...args);
  }

  /**
   * Ran before inserting into the database.
   *     -- adds createdAt/updatedAt if timestamps are enabled
   *     -- check to make sure there are no duplicates values in
   *        the database as defined in the jsonSchema.uniqueProperties value
   *
   * @param {object} queryContext
   * @returns {*}
   */
  $beforeInsert(queryContext) {
    super.$beforeInsert(queryContext);
    if (this.constructor.addTimestamps) {
      if (!this.createdAt) {
        this.createdAt = new Date().toISOString();
      }
      if (!this.updatedAt) {
        this.updatedAt = new Date().toISOString();
      }
    }
    const uniqueProperties =
      (this.constructor.jsonSchema && this.constructor.jsonSchema.uniqueProperties) || [];

    return Promise.all(
      uniqueProperties.map(
        property =>
          new Promise((resolve, reject) => {
            if (Array.isArray(property)) {
              if (property.every(prop => this.hasOwnProperty(prop))) {
                // eslint-disable-next-line prefer-const
                let whereConditions = {};

                property.forEach(prop => {
                  whereConditions[prop] = this[prop];
                });

                // eslint-disable-next-line promise/prefer-await-to-then
                this.constructor
                  .query()
                  .select('id')
                  .where(whereConditions)
                  .first()
                  .then(row => {
                    if (row) {
                      // eslint-disable-next-line prefer-const
                      let errors = {};

                      property.forEach(prop => {
                        errors[prop] = [
                          {
                            message: `${prop} is already taken.`,
                          },
                        ];
                      });

                      return reject(new ValidationError(errors));
                    }

                    return resolve();
                  })
                  .catch(reject);
              }
            } else if (this.hasOwnProperty(property)) {
              // eslint-disable-next-line promise/prefer-await-to-then
              this.constructor
                .query()
                .select('id')
                .where(property, this[property])
                .first()
                .then(row => {
                  if (row) {
                    return reject(
                      new ValidationError({
                        [property]: [
                          {
                            message: `${property} is already taken.`,
                          },
                        ],
                      }),
                    );
                  }

                  return resolve();
                })
                .catch(reject);
            }
          }),
      ),
    );
  }

  /**
     * Ran before updating the database.
     *
     * It will:
     *   - change the updated_at field if timestamps are enabled
     *   - check to make sure there are no duplicates values in the database as defined in the
     *     jsonSchema.uniqueProperties value
     *
     * @param {ModelOptions} opt
     * @param {QueryBuilderContext} queryContext
     * @returns {*}
     */
  $beforeUpdate(opt, queryContext) {
    super.$beforeUpdate(opt, queryContext);

    if (this.constructor.addTimestamps) {
      this.updatedAt = new Date().toISOString();
    }
    const uniqueProperties =
      (this.constructor.jsonSchema && this.constructor.jsonSchema.uniqueProperties) || [];

    return Promise.all(
      uniqueProperties.map(
        property =>
          new Promise((resolve, reject) => {
            if (Array.isArray(property)) {
              if (property.every(prop => this.hasOwnProperty(prop))) {
                const whereConditions = {};

                property.forEach(prop => {
                  whereConditions[prop] = this[prop];
                });

                this.constructor
                  .query()
                  .select('id')
                  .where(whereConditions)
                  .whereNot('id', queryContext.old.id)
                  .first()
                  // eslint-disable-next-line promise/prefer-await-to-then
                  .then(row => {
                    if (row) {
                      const errors = {};

                      property.forEach(prop => {
                        errors[prop] = [
                          {
                            message: `${prop} is already taken.`,
                          },
                        ];
                      });

                      return reject(new ValidationError(errors));
                    }

                    return resolve();
                  })
                  .catch(reject);
              }
            } else if (this.hasOwnProperty(property)) {
              this.constructor
                .query()
                .select('id')
                .where(property, this[property])
                .whereNot('id', queryContext.old.id)
                .first()
                // eslint-disable-next-line promise/prefer-await-to-then
                .then(row => {
                  if (row) {
                    return reject(
                      new ValidationError({
                        [property]: [
                          {
                            message: `${property} is already taken.`,
                          },
                        ],
                      }),
                    );
                  }

                  return resolve();
                })
                .catch(reject);
            }
          }),
      ),
    );
  }

  $beforeDelete(opt, queryContext) {
    super.$beforeDelete(queryContext);
  }

  $formatDatabaseJson(json) {
    // eslint-disable-next-line prefer-const
    let fmtJson = super.$formatDatabaseJson.call(this, json);

    return mapKeys(fmtJson, (value, key) => toSnakeCase(key));
  }

  /**
     * Ran after querying the database and transforming to the Model.
     *
     * @param {object} json
     * @returns {object}
     */
  $parseDatabaseJson(json) {
    // eslint-disable-next-line prefer-const
    let parsedJson = super.$parseDatabaseJson.call(this, json);

    Object.keys(this.constructor.transforms).forEach(key => {
      if (parsedJson.hasOwnProperty(key)) {
        parsedJson[key] = this.constructor.transforms[key](parsedJson[key]);
      }
    });

    this.constructor.hidden.forEach(hidden => {
      if (parsedJson.hasOwnProperty(hidden)) {
        delete parsedJson[hidden];
      }
    });

    return mapKeys(parsedJson, (value, key) => toCamelCase(key));
  }

  // Uses http://json-schema.org/latest/json-schema-validation.html
  static getJsonSchema() {
    // Memoize the jsonSchema but only for this class. The hasOwnProperty check
    // will fail for subclasses and the value gets recreated.
    // eslint-disable-next-line
    if (!this.hasOwnProperty('$$jsonSchema')) {
      // this.jsonSchema is often a getter that returns a new object each time. We need
      // memoize it to make sure we get the same instance each time.
      const jsonSchema = this.jsonSchema;

      if (jsonSchema && jsonSchema.properties) {
        const columns = this.systemColumns || [];
        columns.forEach(column => {
          jsonSchema.properties[column] = { type: ['datetime', 'string', 'int', 'null'] };
        });
      }

      Object.defineProperty(this, '$$jsonSchema', {
        enumerable: false,
        writable: true,
        configurable: true,
        value: jsonSchema,
      });
    }

    return this.$$jsonSchema;
  }

  async reload() {
    const model = await this.$query();
    Object.assign(this, model);
    return this;
  }
}

BaseModel.QueryBuilder = BaseQueryBuilder;
BaseModel.RelatedQueryBuilder = BaseQueryBuilder;
export default BaseModel;

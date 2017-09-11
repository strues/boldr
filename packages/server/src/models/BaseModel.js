/* eslint-disable no-prototype-builtins */
import { Model, ValidationError } from 'objection';
import camelCase from 'lodash/camelCase';
import mapKeys from 'lodash/mapKeys';
import snakeCase from 'lodash/snakeCase';
import memoize from 'lodash/memoize';

const toCamelCase = memoize(camelCase);
const toSnakeCase = memoize(snakeCase);

export function mergeSchemas(...schemas) {
  return schemas.reduce(
    (mergedSchema, schema) => ({
      ...mergedSchema,
      ...schema,
      required: [...mergedSchema.required, ...schema.required],
      properties: {
        ...mergedSchema.properties,
        ...schema.properties,
      },
    }),
    {
      required: [],
      properties: {},
    },
  );
}

export default class BaseModel extends Model {
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
  static jsonSchema = {
    type: 'object',
    required: [],
    properties: {
      id: {
        type: ['number', 'string'],
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
      },
      deletedAt: {
        type: 'string',
        format: 'date-time',
      },
    },
  };

  async reload() {
    const model = await this.$query();
    Object.assign(this, model);
    return this;
  }
}

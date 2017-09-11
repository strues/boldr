import BaseModel from './BaseModel';

class Setting extends BaseModel {
  static tableName = 'setting';
  static addTimestamps = false;
  static jsonSchema = {
    type: 'object',
    additionalProperties: false,
    required: ['key', 'value', 'label', 'description'],
    properties: {
      id: {
        type: 'number',
      },
      key: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
      value: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
      label: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
      description: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
    },
  };
}

export default Setting;

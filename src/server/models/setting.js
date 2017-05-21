import { Model } from 'boldr-orm';
import BaseModel from './Base';

class Setting extends BaseModel {
  static tableName = 'setting';
  static jsonSchema = {
    type: 'object',
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
  static addTimestamps = false;
}

export default Setting;

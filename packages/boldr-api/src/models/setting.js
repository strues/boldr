import { Model } from 'objection';
import BaseModel from './base';

class Setting extends BaseModel {
  static get tableName() {
    return 'setting';
  }
  static addTimestamps = false;
}

export default Setting;

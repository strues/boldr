import { Model } from 'objection';
import { BaseModel } from 'core/index';

class Setting extends BaseModel {
  static get tableName() { return 'setting'; }
  static addTimestamps = false;
  static addUUID = true;

}

export default Setting;

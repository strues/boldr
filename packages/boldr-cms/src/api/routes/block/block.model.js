import { Model } from 'objection';
import BaseModel from '../../core/base/BaseModel';

class Block extends BaseModel {
  static get tableName() { return 'block'; }
  static addTimestamps = true;
  static addUUID = false;

}

export default Block;

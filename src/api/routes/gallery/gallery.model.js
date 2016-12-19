import { Model } from 'objection';
import BaseModel from '../../core/base/BaseModel';

class Gallery extends BaseModel {
  static get tableName() { return 'gallery'; }
  static addTimestamps = true;
  static addUUID = false;
}

export default Gallery;

import { Model } from 'objection';
import BaseModel from '../../core/base/BaseModel';

class Collection extends BaseModel {
  static get tableName() { return 'collection'; }

}

export default Collection;

import { Model } from 'objection';
import { BaseModel } from '../../core';

class Page extends BaseModel {
  static get tableName() { return 'page'; }

}

export default Page;

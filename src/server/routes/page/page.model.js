import { Model } from 'objection';
import { BaseModel } from '../../core';
import Template from '../template/template.model';

class Page extends BaseModel {
  static get tableName() { return 'page'; }
  static addTimestamps = true;
  static addUUID = false;

  static get relationMappings() {
    return {
      templates: {
        relation: Model.ManyToManyRelation,
        modelClass: Template,
        join: {
          from: 'page.id',
          through: {
            from: 'template_page.page_id',
            to: 'template_page.template_id',
            // modelClass: UserRole,
          },
          to: 'template.id',
        },
      },
    };
  }
}

export default Page;

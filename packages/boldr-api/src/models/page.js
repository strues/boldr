import { Model } from 'objection';
import BaseModel from './base';
import Template from './template';

class Page extends BaseModel {
  static get tableName() {
    return 'page';
  }
  static addTimestamps = true;

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

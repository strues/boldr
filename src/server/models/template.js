import { Model } from 'objection';
import BaseModel from './base';
import Page from './page';

class Template extends BaseModel {
  static get tableName() {
    return 'template';
  }
  static addTimestamps = true;

  static get relationMappings() {
    return {
      pages: {
        relation: Model.ManyToManyRelation,
        modelClass: Page,
        join: {
          from: 'template.id',
          through: {
            from: 'template_page.templateId',
            to: 'template_page.pageId',
            // modelClass: UserRole,
          },
          to: 'page.id',
        },
      },
    };
  }
}

export default Template;

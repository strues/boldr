import { Model } from 'objection';
import { BaseModel } from '../../core';
import Page from '../page/page.model';

class Template extends BaseModel {
  static get tableName() { return 'template'; }
  static addTimestamps = true;
  static addUUID = true;

  static get relationMappings() {
    return {
      pages: {
        relation: Model.ManyToManyRelation,
        modelClass: Page,
        join: {
          from: 'template.id',
          through: {
            from: 'template_page.template_id',
            to: 'template_page.page_id',
            // modelClass: UserRole,
          },
          to: 'page.id',
        },
      },
    };
  }
}

export default Template;

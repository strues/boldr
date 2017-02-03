import { Model } from 'objection';
import Page from '../page';
import BaseModel from '../base';
import Template from '../template';

/**
 * This is the join table connecting templates to pages.
 *
 * A page can only have one of the same template.
 *
 * @see ../Template
 * @see ../Page
 * @extends ../BaseModel
 */
class TemplatePage extends BaseModel {
  static tableName = 'template_page';
  static addTimestamps = false;

  static relationMappings = {
    role: {
      relation: Model.BelongsToOneRelation,
      modelClass: Template,
      join: {
        from: 'template_page.template_id',
        to: 'template.id',
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: Page,
      join: {
        from: 'template_page.page_id',
        to: 'page.id',
      },
    },
  };
}

export default TemplatePage;

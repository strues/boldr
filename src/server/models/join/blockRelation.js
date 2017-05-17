import { Model } from 'objection';
import Block from '../block';
import BaseModel from '../base';

/**
 * This is the join table connecting tags to posts.
 *
 * @see ../Block
 * @extends ../BaseModel
 */
class BlockRelation extends BaseModel {
  static get tableName() {
    return 'block_relation';
  }

  static addTimestamps = false;

  // static get idColumn() {
  //   return ['parentId', 'childId'];
  // }
  //
  // static get relationMappings() {
  //   return {
  //     children: {
  //       relation: Model.ManyToManyRelation,
  //       modelClass: Block,
  //       join: {
  //         from: 'block.id',
  //         through: {
  //           from: 'block_relation.parentId',
  //           to: 'block_relation.childId',
  //         },
  //         to: 'block.id',
  //       },
  //     },
  //     parents: {
  //       relation: Model.ManyToManyRelation,
  //       modelClass: Block,
  //       join: {
  //         from: 'block.id',
  //         through: {
  //           from: 'block_relation.parentId',
  //           to: 'block_relation.childId',
  //         },
  //         to: 'block.id',
  //       },
  //     },
  //   };
  // }
}

export default BlockRelation;

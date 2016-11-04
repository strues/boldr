import uuid from 'node-uuid';
import { responseHandler, NotFound, InternalServer } from '../../core';
import Activity from '../activity/activity.model';
import Block from './block.model';

const debug = require('debug')('boldr:block-controller');

export async function listBlocks(req, res, next) {
  try {
    const blocks = await Block.query();

    if (!blocks) {
      return next(new NotFound());
    }

    return res.status(200).json(blocks);
  } catch (error) {
    return next(new InternalServer());
  }
}

export async function createBlock(req, res, next) {
  try {
    const newBlock = await newBlock.query().insert({
      id: uuid.v4(),
      name: req.body.name,
      label: req.body.label,
      element: req.body.element,
      content: req.body.content,
    });
    await Activity.query().insert({
      id: uuid.v4(),
      name: newBlock.name,
      user_id: req.user.id,
      action: 'New block',
      type: 'create',
      data: { newBlock },
      entry_uuid: newBlock.id,
      entry_table: 'block',
    });

    return res.status(202).json(newBlock);
  } catch (error) {
    return next(new InternalServer());
  }
}

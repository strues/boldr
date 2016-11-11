import uuid from 'node-uuid';
import slugify from 'slugify';
import { NotFound, InternalServer } from '../../core';
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
  const elem = req.body.element;
  const newBlock = await Block.query().insert({
    id: uuid.v4(),
    name: slugify(req.body.name),
    element: elem.toLowerCase(),
    content: req.body.content,
  });
  if (!newBlock) {
    return res.status(500).json('error');
  }
  await Activity.query().insert({
    id: uuid.v4(),
    name: slugify(newBlock.name),
    user_id: req.user.id,
    action: 'New block',
    type: 'create',
    data: { newBlock },
    entry_uuid: newBlock.id,
    entry_table: 'block',
  });

  return res.status(201).json(newBlock);
}

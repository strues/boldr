import uuid from 'node-uuid';
import slugIt from '../../utils/slugIt';
import { NotFound, InternalServer, responseHandler } from '../../core';
import Activity from '../activity/activity.model';
import Block from './block.model';

const debug = require('debug')('boldr:block-controller');

export async function listBlocks(req, res, next) {
  try {
    const blocks = await Block.query();

    if (!blocks) {
      return next(new NotFound());
    }

    return responseHandler(res, 200, blocks);
  } catch (error) {
    return next(new InternalServer());
  }
}

export async function createBlock(req, res, next) {
  const elem = req.body.element;
  const newBlock = await Block.query().insert({
    id: uuid.v4(),
    name: slugIt(req.body.name),
    element: elem.toLowerCase(),
    content: req.body.content,
  });
  if (!newBlock) {
    return res.status(500).json('error');
  }
  await Activity.query().insert({
    id: uuid.v4(),
    name: slugIt(newBlock.name),
    user_id: req.user.id,
    action: 'New block',
    type: 'create',
    data: { newBlock },
    entry_uuid: newBlock.id,
    entry_table: 'block',
  });

  return responseHandler(res, 201, newBlock);
}

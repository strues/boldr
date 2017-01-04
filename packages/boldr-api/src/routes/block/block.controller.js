import uuid from 'uuid';
import slugIt from '../../utils/slugIt';
import { responseHandler } from '../../core/index';
import Activity from '../activity/activity.model';
import Block from './block.model';

const debug = require('debug')('boldrAPI:block-controller');

export async function listBlocks(req, res, next) {
  try {
    const blocks = await Block.query();

    if (!blocks) {
      return res.status(404).json({ message: 'Unable to find any block data.' });
    }

    return responseHandler(res, 200, blocks);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function createBlock(req, res, next) {
  try {
    const elem = req.body.element;
    const newBlock = await Block.query().insert({
      id: uuid(),
      name: slugIt(req.body.name),
      element: elem.toLowerCase(),
      content: req.body.content,
    });
    if (!newBlock) {
      return res.status(400).json({ message: 'Unable to create a new block object.' });
    }
    await Activity.query().insert({
      id: uuid(),
      name: slugIt(newBlock.name),
      user_id: req.user.id,
      action: 'New block',
      type: 'create',
      data: { newBlock },
      entry_uuid: newBlock.id,
      entry_table: 'block',
    });

    return responseHandler(res, 201, newBlock);
  } catch (error) {
    return res.status(500).json(error);
  }
}

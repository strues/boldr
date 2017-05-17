import uuid from 'uuid';
import slugIt from '../../utils/slugIt';
import BlockRelation from '../../models/join/blockRelation';
import Block from '../../models/block';
import ContentType from '../../models/contentType';
import { responseHandler, Conflict, BadRequest } from '../../core/index';

function throwNotFound() {
  const error = new Error();
  error.statusCode = 404;
  throw error;
}

export async function listBlocks(req, res, next) {
  try {
    const blocks = await Block.query().eager('[contentType,children,parents]');
    return res.status(200).json(blocks);
  } catch (error) {
    return next(error);
  }
}

export async function getBlock(req, res, next) {
  try {
    const block = await Block.query()
      .findById(req.params.id)
      .eager('[contentType,children,parents]');

    return res.status(200).json(block);
  } catch (error) {
    return next(error);
  }
}

export async function createBlock(req, res, next) {
  try {
    const contType = await ContentType.query().findById(req.body.contentTypeId);
    if (!contType) {
      throwNotFound();
    }
    const payload = {
      contentTypeId: req.body.contentTypeId,
      key: req.body.key,
      content: req.body.content,
      entities: req.body.entities,
    };

    const newBlock = await contType.$relatedQuery('blocks').insert(payload);
    return responseHandler(res, 201, newBlock);
  } catch (error) {
    return next(error);
  }
}

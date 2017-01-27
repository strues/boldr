import Debug from 'debug';
import uuid from 'uuid';
import * as objection from 'objection';
import s3 from '../../services/aws/s3';
import { responseHandler, BadRequest } from '../../core/index';
import getConfig from '../../../config/get';
import Activity from '../../models/activity';
import Attachment from '../../models/attachment';

const debug = Debug('boldrAPI:attachment-controller');

export const listAttachments = async (req, res, next) => {
  try {
    const medias = await Attachment.query();

    return responseHandler(res, 200, medias);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export async function fromDashboard(req, res, next) {
  const fileFields = {
    url: req.body.url,
    user_id: req.user.id,
    file_name: req.body.file_name,
    original_name: req.body.original_name,
    file_description: req.body.file_description,
    file_type: req.body.file_type,
    s3_key: req.body.s3_key,
  };
  const newAttachment = await Attachment.query().insertAndFetch(fileFields);

  await Activity.query().insert({
    user_id: req.user.id,
    action_type_id: 1,
    activity_attachment: newAttachment.id,
  });
  return responseHandler(res, 201, newAttachment);
}

export const getAttachment = async (req, res, next) => {
  try {
    const media = await Attachment.query().findById(req.params.id);
    return responseHandler(res, 200, media);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export function getAllAWS(req, res, next) {
  const params = {
    Bucket: getConfig('aws.bucket'),
  };
  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      debug(err, err.stack);
    } else {
      debug(data);
    }
  });
}

export function updateAttachment(req, res) {
  debug(req.body);
  return Attachment.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(attachment => responseHandler(res, 202, attachment));
}

export async function deleteAttachment(req, res, next) {
  try {
    const attachment = await Attachment.query().findById(req.params.id);

    if (!attachment) {
      return next(new BadRequest());
    }

    await Activity.query().where({ activity_attachment: req.params.id }).first().then((activity) => {
      return activity.$relatedQuery('attachment').unrelate().where('activity_attachment', req.params.id);
    });

    await Attachment.query().deleteById(req.params.id);
    const params = {
      Bucket: getConfig('aws.bucket'),
      Key: attachment.s3_key,
    };
    await s3.deleteObject(params, (err, data) => {
      if (err) return next(new BadRequest(err));
    });

    return res.status(204);
  } catch (error) {
    return next(new BadRequest(error));
  }
}

import Debug from 'debug';
import uuid from 'uuid';
import s3 from '../../services/aws/s3';
import { responseHandler } from '../../core/index';
import config from '../../../config/api';
import Activity from '../activity/activity.model';
import Attachment from './attachment.model';


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
    id: uuid(),
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
    id: uuid(),
    name: newAttachment.file_name,
    user_id: req.user.id,
    action: 'New upload',
    type: 'create',
    data: { newAttachment },
    entry_uuid: newAttachment.id,
    entry_table: 'attachment',
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
    Bucket: config.aws.bucket,
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
    const params = {
      Bucket: config.aws.bucket,
      Key: attachment.s3_key,
    };
    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
        return res.status(500).json(err);
      } else {
        console.log(data);
      }
    });
    await Attachment.query().deleteById(req.params.id);
    return responseHandler(res, 204, 'Deleted file');
  } catch (error) {
    return res.status(500).json(error);
  }
}

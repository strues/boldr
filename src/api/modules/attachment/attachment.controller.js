import Debug from 'debug';
import AWS from 'aws-sdk';
import uuid from 'node-uuid';
import multer from 'multer';

import conf from '../../config/config';
import Activity from '../activity/activity.model';
import Attachment from './attachment.model';
import { multerOptions, multerAvatar, multerArticle } from './attachment.service';

const debug = Debug('boldr:attachment:controller');

// create a new S3 object
const s3 = new AWS.S3({
  accessKeyId: conf.get('aws.keyId'),
  secretAccessKey: conf.get('aws.keySecret'),
  region: conf.get('aws.region'),
});

export const uploadFiles = multer(multerOptions);
export const uploadAvatar = multer(multerAvatar);
export const uploadArticle = multer(multerArticle);

export const listAttachments = async (req, res, next) => {
  try {
    const medias = await Attachment.query();

    return res.status(200).json(medias);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export async function fromDashboard(req, res, next) {
  const fileFields = {
    id: uuid.v4(),
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
    id: uuid.v4(),
    name: newAttachment.file_name,
    user_id: req.user.id,
    action: 'New upload',
    type: 'create',
    data: { newAttachment },
    entry_uuid: newAttachment.id,
    entry_table: 'attachment',
  });
  return res.status(201).json(newAttachment);
}

export const getAttachment = async (req, res, next) => {
  try {
    const media = await Attachment.query().findById(req.params.id);
    return res.status(200).json(media);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export function getAllAWS(req, res, next) {
  const params = {
    Bucket: conf.get('aws.bucket'),
  };
  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      debug(err, err.stack);
    } else {
      debug(data);
    }
  });
}

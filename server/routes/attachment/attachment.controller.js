import path from 'path';
import Debug from 'debug';
import uuid from 'uuid';
import * as objection from 'objection';
import fs from 'fs-extra';
import shortId from 'shortid';
import Busboy from 'busboy';

import s3 from '../../services/aws/s3';
import { responseHandler, BadRequest } from '../../core/index';
import getConfig from '../../../config/get';
import Activity from '../../models/activity';
import Attachment from '../../models/attachment';

const gm = require('gm').subClass({ imageMagick: true });

const regex = new RegExp('^.*.((j|J)(p|P)(e|E)?(g|G)|(g|G)(i|I)(f|F)|(p|P)(n|N)(g|G))$');
const debug = Debug('boldr:attachment-controller');

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

export async function getAttachment(req, res, next) {
  try {
    const media = await Attachment.query().findById(req.params.id);
    return responseHandler(res, 200, media);
  } catch (err) {
    return res.status(500).json(err);
  }
}

export function updateAttachment(req, res) {
  debug(req.body);
  return Attachment.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(attachment => responseHandler(res, 202, attachment));
}

export async function deleteS3Attachment(req, res, next) {
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

    fs.removeSync(`./public/files/${attachment.safe_name}`);

    return res.status(204).json('Deleted');
  } catch (error) {
    return next(new BadRequest(error));
  }
}
export async function uploadImage(req, res, next) {
  let fstream;
  const busboy = new Busboy({ headers: req.headers });

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (filename.length === 0) {
      res.status(400).json({
        message: 'No file selected!',
      });
    }
    if (!filename.match(regex)) {
      return res.status(400).json('Invalid file type');
    }
    // define temporary file path before processing.
    const tmpFilePath = path.join(process.cwd(), './public/.tmp');
    // generate a shortid for the new file name and keep the ext
    const imgId = shortId.generate();
    const newFileName = imgId + path.extname(filename);
    // stream to file
    fstream = fs.createWriteStream(`./public/.tmp/${newFileName}`);
    // wrtie temporary file from stream
    file.pipe(fstream);
    // once file is written and close is emitted
    fstream.on('close', () => {
      // get the file from temp loc
      const fileLoc = path.join(tmpFilePath, newFileName);
      // create a readstream
      const readstream = fs.createReadStream(fileLoc);
      // send through graphicsmagick
      gm(readstream).noProfile().quality(70).write(`./public/files/${newFileName}`, async (err) => {
        if (err) {
          return res.status(500).send('Could not parse upload completely.');
        }
        fs.removeSync(fileLoc);
        // TODO: configure url based on config value.
        const newAttachment = await Attachment.query().insert({
          original_name: filename,
          user_id: req.user.id,
          file_name: newFileName,
          safe_name: newFileName,
          // path: `files/${newFileName}`,
          url: `/files/${newFileName}`,
          file_description: req.body.file_description,
          file_type: mimetype,
        });
        await Activity.query().insert({
          user_id: req.user.id,
          action_type_id: 1,
          activity_attachment: newAttachment.id,
        });

        return res.status(201).json(newAttachment);
      });
    });
  });

  busboy.on('error', (error) => {
    console.log('Error', 'Something went wrong parsing the form', error);
    res.status(500).send('Could not parse upload completely.');
  });

  return req.pipe(busboy);
}

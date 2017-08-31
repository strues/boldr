import path from 'path';
import { GraphQLNonNull, GraphQLID, GraphQLList } from 'graphql';
import _debug from 'debug';
import fs from 'fs-extra';
import Jimp from 'jimp';
import shortId from 'shortid';
import appRoot from '@boldr/utils/lib/node/appRoot';
import File from '../../models/File';
import Upload from '../../schema/input/upload';
import FileType from '../../schema/type/file';

const debug = _debug('boldr:server:articleMutation');
const UPLOAD_DIR = path.resolve(appRoot.get(), './public/uploads');

export default {
  singleUpload: {
    type: FileType,
    description: 'Upload a new media file and store in the database.',
    args: {
      file: {
        type: new GraphQLNonNull(Upload),
        description: 'The file to upload',
      },
    },
    async resolve(_, args, context) {
      const id = shortId.generate();
      const actualFileName = id + path.extname(args.file.name);

      fs.moveSync(args.file.path, `${UPLOAD_DIR}/files/${actualFileName}`);
      const thumbnailSaveName = `${id}thumb${path.extname(args.file.name)}`;
      Jimp.read(`${UPLOAD_DIR}/files/${actualFileName}`, (err, image) => {
        if (err) {
          return debug('error', err);
        }
        return image
          .resize(320, 240)
          .write(path.join(UPLOAD_DIR, 'files', thumbnailSaveName), (err, info) => {
            if (err) {
              logger.error(err);
            }
            debug(info);
          });
      });
      const newFile = await File.query().insert({
        name: actualFileName,
        safeName: actualFileName,
        thumbName: thumbnailSaveName,
        type: args.file.type,
        url: `/uploads/media/${actualFileName}`,
        path: `${UPLOAD_DIR}/media/${actualFileName}`,
        ownerId: context.user.id,
      });
      return newFile;
    },
  },
  multipleUpload: {
    type: new GraphQLList(FileType),
    description: 'Upload a new media file and store in the database.',
    args: {
      files: {
        type: new GraphQLList(Upload),
        description: 'The file to upload',
      },
    },
    async resolve(_, args, context) {
      const id = shortId.generate();
      const actualFileName = id + path.extname(args.file.name);

      fs.moveSync(args.file.path, `${UPLOAD_DIR}/files/${actualFileName}`);
      const thumbnailSaveName = `${id}thumb${path.extname(args.file.name)}`;
      Jimp.read(`${UPLOAD_DIR}/files/${actualFileName}`, (err, image) => {
        if (err) {
          return debug('error', err);
        }
        return image
          .resize(320, 240)
          .write(path.join(UPLOAD_DIR, 'files', thumbnailSaveName), (err, info) => {
            if (err) {
              logger.error(err);
            }
            debug(info);
          });
      });
      const newFile = await File.query().insert({
        name: actualFileName,
        safeName: actualFileName,
        thumbName: thumbnailSaveName,
        type: args.file.type,
        url: `/uploads/media/${actualFileName}`,
        path: `${UPLOAD_DIR}/media/${actualFileName}`,
        ownerId: context.user.id,
      });
      return newFile;
    },
  },
};

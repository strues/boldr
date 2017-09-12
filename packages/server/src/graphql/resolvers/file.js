/* eslint-disable no-unused-vars */
import path from 'path';
import _debug from 'debug';
import fs from 'fs-extra';
import Jimp from 'jimp';
import shortId from 'shortid';
import appRoot from '@boldr/utils/lib/node/appRoot';

import { errorObj } from '../../errors';

const debug = _debug('boldr:server:gql:resolvers:file');
const UPLOAD_DIR = path.resolve(appRoot.get(), './public/uploads');

const fileResolvers = {
  Query: {
    files: async (obj, { limit, offset }, { models: { File } }) => {
      const file = await File.query()
        .limit(limit)
        .offset(offset);
      if (file) {
        return file;
      }
      throw errorObj({ _error: 'Unable to locate file' });
    },
  },
  Mutation: {
    singleUpload: async (obj, args, ctx) => {
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
      const newFile = await ctx.models.File.query().insert({
        name: actualFileName,
        safeName: actualFileName,
        thumbName: thumbnailSaveName,
        type: args.file.type,
        url: `/uploads/media/${actualFileName}`,
        path: `${UPLOAD_DIR}/media/${actualFileName}`,
        ownerId: ctx.user.id,
      });
      return newFile;
    },
    multipleUpload: async (obj, args, ctx) => {
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
      const newFile = await ctx.models.File.query().insert({
        name: actualFileName,
        safeName: actualFileName,
        thumbName: thumbnailSaveName,
        type: args.file.type,
        url: `/uploads/media/${actualFileName}`,
        path: `${UPLOAD_DIR}/media/${actualFileName}`,
        ownerId: ctx.user.id,
      });
      return newFile;
    },
  },
};

export default fileResolvers;

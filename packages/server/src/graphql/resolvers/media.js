/* eslint-disable no-unused-vars */
import path from 'path';
import _debug from 'debug';
import fs from 'fs-extra';
import Jimp from 'jimp';
import nanoid from 'nanoid';
import appRoot from '@boldr/utils/lib/node/appRoot';

import { errorObj } from '../../errors';

const debug = _debug('boldr:server:graphql:resolvers:media');
const UPLOAD_DIR = path.resolve(appRoot.get(), './public/uploads');

const mediaResolvers = {
  Query: {
    getMedia: async (obj, args, { models: { Media } }) => {
      const media = await Media.query().returning('*');
      if (!media) {
        throw errorObj({ _error: 'Unable to locate media' });
      }
      return media;
    },
    getMediaById: async (obj, { id }, { models: { Media } }) => {
      const media = await Media.getMediaById(id);
      if (!media) {
        throw errorObj({ _error: 'Unable to locate a file with that id' });
      }
      return media;
    },
  },
  Mutation: {
    uploadMedia: async (obj, args, ctx) => {
      const id = nanoid();
      const actualFileName = id + path.extname(args.file.name);

      fs.moveSync(args.file.path, `${UPLOAD_DIR}/media/${actualFileName}`);
      const thumbnailSaveName = `${id}thumb${path.extname(args.file.name)}`;
      Jimp.read(`${UPLOAD_DIR}/media/${actualFileName}`, (err, image) => {
        if (err) {
          return debug('error', err);
        }
        return image
          .resize(320, 240)
          .write(path.join(UPLOAD_DIR, 'media', thumbnailSaveName), (err, info) => {
            if (err) {
              logger.error(err);
            }
            debug(info);
          });
      });
      const newMedia = await ctx.models.Media.query().insert({
        name: actualFileName,
        safeName: actualFileName,
        thumbName: thumbnailSaveName,
        type: args.file.type,
        url: `/uploads/media/${actualFileName}`,
        path: `${UPLOAD_DIR}/media/${actualFileName}`,
        ownerId: ctx.user.id,
      });
      return newMedia;
    },
    editMedia: async (obj, args, { models: { Media } }) => {
      debug(args);
      const updatedMedia = await Media.query().patchAndFetchById(args.id, {
        name: args.input.name,
        fileDescription: args.input.fileDescription,
      });
      return updatedMedia;
    },
    deleteMedia: (obj, args) => {
      return Media.query().deleteById(args.id);
    },
  },
};

export default mediaResolvers;

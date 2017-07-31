import path from 'path';
import { GraphQLList, GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLString } from 'graphql';
import _debug from 'debug';
import fs from 'fs-extra';
import Jimp from 'jimp';
import shortId from 'shortid';
import appRoot from 'boldr-utils/lib/node/appRoot';
import FileType from '../file/fileType';
import Media from '../../models/Media';
import MediaType, { UploadMediaInput, EditMediaInput } from './mediaType';

const debug = _debug('boldr:server:articleMutation');
const UPLOAD_DIR = path.resolve(appRoot.get(), './public/uploads');

export default {
  uploadMedia: {
    type: FileType,
    description: 'Upload a new media file and store in the database.',
    args: {
      file: {
        type: new GraphQLNonNull(UploadMediaInput),
        description: 'The file to upload',
      },
    },
    async resolve(_, args, context) {
      const id = shortId.generate();
      const actualFileName = id + path.extname(args.file.name);

      fs.moveSync(args.file.path, `${UPLOAD_DIR}/media/${actualFileName}`);
      const thumbnailSaveName = `${id}thumb${path.extname(args.file.name)}`;
      Jimp.read(`${UPLOAD_DIR}/media/${actualFileName}`, (err, image) => {
        if (err) {
          return debug('error', err);
        }
        image
          .resize(320, 240)
          .write(path.join(UPLOAD_DIR, 'media', thumbnailSaveName), (err, info) => {
            if (err) {
              logger.error(err);
            }
          });
      });
      const newMedia = await Media.query().insert({
        name: actualFileName,
        safeName: actualFileName,
        thumbName: thumbnailSaveName,
        type: args.file.type,
        url: `/uploads/media/${actualFileName}`,
        path: `${UPLOAD_DIR}/media/${actualFileName}`,
        userId: context.user.id,
      });
      return newMedia;
    },
  },
  editMedia: {
    type: MediaType,
    description: 'Edit an existing media file',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The media ID',
      },
      input: {
        type: new GraphQLNonNull(EditMediaInput),
        description: 'The required fields for editing a media file.',
      },
    },
    async resolve(_, args, context) {
      debug(args);
      const updatedMedia = await Media.query().patchAndFetchById(args.id, {
        name: args.input.name,
        fileDescription: args.input.fileDescription,
      });
      return updatedMedia;
    },
  },
  deleteMedia: {
    type: MediaType,
    description: 'Remove a media file from the server',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The media ID',
      },
    },
    async resolve(_, args, context) {
      const removedMedia = await Media.query().deleteById(args.id);
      return removedMedia;
    },
  },
};

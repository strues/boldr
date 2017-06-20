import path from 'path';
import util from 'util';
import url from 'url';
import { GraphQLList, GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLString } from 'graphql';
import _debug from 'debug';
import fs from 'fs-extra';
import Jimp from 'jimp';
import shortId from 'shortid';
import appRoot from 'boldr-utils/lib/node/appRoot';
import { GraphQLUUID } from '../scalars';
import Media from '../../models/Media';
import slugIt from '../../utils/slugIt';
import MediaType, { FileType, UploadMediaInput } from './mediaType';

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
      const thumbnailSaveName = `${id}-thumb${path.extname(args.file.name)}`;
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
        mediaType: 'image',
        url: `/uploads/media/${actualFileName}`,
        path: `${UPLOAD_DIR}/media/${actualFileName}`,
        userId: context.user.id,
      });
      return newMedia;
    },
  },
};

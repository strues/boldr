import { GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
import jsonResult from 'boldr-utils/es/gql/jsonResult';
import {
  GraphQLEmail,
  GraphQLURL,
  GraphQLDateTime,
  GraphQLUUID,
} from '../scalars';
import Attachment from '../../models/Attachment';
import AttachmentType from './attachmentType';

export default {
  getAttachments: {
    type: new GraphQLList(AttachmentType),
    description: 'A query for a listing of all attachments',
    async resolve(_, { limit, offset }, context) {

      const attachment = await Attachment.query().returning('*');
      if (attachment) {
        return attachment;
      }
      console.log('error');
    },
  },
};

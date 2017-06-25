import { GraphQLList, GraphQLNonNull, GraphQLID, GraphQLInt } from 'graphql';
import jsonResult from 'boldr-utils/lib/gql/jsonResult';
import { GraphQLEmail, GraphQLURL, GraphQLDateTime, GraphQLUUID } from '../scalars';
import Attachment from '../../models/Attachment';
import AttachmentType from './attachmentType';

export default {
  getAttachments: {
    type: new GraphQLList(AttachmentType),
    description: 'A query for a listing of all attachments',
    args: {
      offset: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'The number of attachments to offset',
      },
      limit: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'The maximum number of attachments to return at a time.',
      },
    },
    async resolve(_, { limit, offset }, context) {
      const attachment = await Attachment.query().returning('*');
      if (attachment) {
        return attachment;
      }
      console.log('error');
    },
  },
};

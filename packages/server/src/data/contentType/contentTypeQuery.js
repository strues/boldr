import { GraphQLList, GraphQLID, GraphQLNonNull } from 'graphql';
import ContentT from '../../models/ContentType';
import { errorObj } from '../../errors';
import ContentType from '../../schema/type/contentType';

export default {
  contentTypes: {
    type: new GraphQLList(ContentType),
    description: 'A query for a listing of all content types',
    async resolve() {
      const contentTypes = await ContentT.query().returning('*');
      if (!contentTypes) {
        throw errorObj({ _error: 'Unable to find contentTypes.' });
      }

      return contentTypes;
    },
  },
  contentType: {
    type: ContentType,
    description: 'A query for a single content type',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The id of the requested content type',
      },
    },
    async resolve(root, { id }) {
      const contentType = await ContentT.query()
        .findById(id)
        .eager('[entities]');
      if (!contentType) {
        throw errorObj({ _error: 'Unable to find a contentType.' });
      }

      return contentType;
    },
  },
};

import { GraphQLList } from 'graphql';
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
};

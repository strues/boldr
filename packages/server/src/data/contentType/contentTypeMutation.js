import { GraphQLList, GraphQLID, GraphQLNonNull } from 'graphql';
import ContentT from '../../models/ContentType';
import { errorObj } from '../../errors';
import slugIt from '../../utils/slugIt';
import ContentType from '../../schema/type/contentType';
import CreateContentTypeInput from '../../schema/input/createContentType';

export default {
  createContentType: {
    type: ContentType,
    description: 'Adds a new content type to the database.',
    args: {
      input: {
        type: new GraphQLNonNull(CreateContentTypeInput),
      },
    },
    async resolve(_, args) {
      const newContentType = await ContentT.query().insert({
        name: args.input.name,
        slug: slugIt(args.input.slug),
        icon: args.input.icon,
        description: args.input.description,
      });

      return newContentType;
    },
  },
};

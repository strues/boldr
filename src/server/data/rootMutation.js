import { GraphQLObjectType } from 'graphql';
import article from './article/articleMutation';
import user from './user/userMutation';
import tag from './tag/tagMutation';

const rootFields = Object.assign({}, article, user, tag);

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => rootFields,
});

export default RootMutationType;

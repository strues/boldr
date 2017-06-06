import { GraphQLObjectType } from 'graphql';
import article from './article/articleMutation';
import setting from './setting/settingMutation';
import tag from './tag/tagMutation';
import user from './user/userMutation';

const rootFields = Object.assign({}, article, setting, tag, user);

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => rootFields,
});

export default RootMutationType;

import { GraphQLObjectType } from 'graphql';
import article from './article/articleQuery';
import attachment from './attachment/attachmentQuery';
import media from './media/mediaQuery';
import menu from './menu/menuQuery';
import role from './role/roleQuery';
import setting from './setting/settingQuery';
import tag from './tag/tagQuery';
import user from './user/userQuery';

const rootFields = Object.assign({}, article, attachment, media, menu, role, setting, tag, user);
const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => rootFields,
});
export default RootQueryType;

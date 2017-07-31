import { GraphQLObjectType } from 'graphql';
import article from './article/articleQuery';
import file from './file/fileQuery';
import media from './media/mediaQuery';
import menu from './menu/menuQuery';
import page from './page/pageQuery';
import role from './role/roleQuery';
import settings from './setting/settingQuery';
import tag from './tag/tagQuery';
import user from './user/userQuery';

const rootFields = Object.assign({}, article, file, media, menu, page, role, settings, tag, user);

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => rootFields,
});

export default RootQueryType;

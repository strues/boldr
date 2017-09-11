import { GraphQLObjectType } from 'graphql';
import account from './account/accountQuery';
import article from './article/articleQuery';
import category from './category/categoryQuery';
import contentType from './contentType/contentTypeQuery';
import entity from './entity/entityQuery';
import file from './file/fileQuery';
import media from './media/mediaQuery';
import menu from './menu/menuQuery';
import page from './page/pageQuery';
import profile from './profile/profileQuery';
import role from './role/roleQuery';
import settings from './setting/settingQuery';
import tag from './tag/tagQuery';

const rootFields = Object.assign(
  {},
  account,
  article,
  category,
  contentType,
  entity,
  file,
  media,
  menu,
  page,
  profile,
  role,
  settings,
  tag,
);

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => rootFields,
});

export default RootQueryType;

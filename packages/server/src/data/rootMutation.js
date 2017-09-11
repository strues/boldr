import { GraphQLObjectType } from 'graphql';
import account from './account/accountMutation';
import article from './article/articleMutation';
import category from './category/categoryMutation';
import contentType from './contentType/contentTypeMutation';
import file from './file/fileMutation';
import media from './media/mediaMutation';
import menu from './menu/menuMutation';
import profile from './profile/profileMutation';
import setting from './setting/settingMutation';
import tag from './tag/tagMutation';

const rootFields = Object.assign(
  {},
  account,
  article,
  category,
  contentType,
  file,
  media,
  menu,
  profile,
  setting,
  tag,
);

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => rootFields,
});

export default RootMutationType;

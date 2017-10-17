import { mergeResolvers } from 'merge-graphql-schemas';

import { GraphQLEmail, GraphQLURL, GraphQLDateTime, GraphQLUUID, GraphQLJSON } from './scalars';
import accountResolvers from './account';
import articleResolvers from './article';
import categoryResolvers from './category';
import contentTypeResolvers from './contentType';
import contentResolvers from './content';
import entityResolvers from './entity';
import fileResolvers from './file';
import menuDetailResolvers from './menuDetail';
import menuResolvers from './menu';
import mediaResolvers from './media';
import pageResolvers from './page';
import profileResolvers from './profile';
import roleResolvers from './role';
import settingResolvers from './setting';
import tagResolvers from './tag';

const customScalarResolvers = {
  DateTime: GraphQLDateTime,
  Email: GraphQLEmail,
  URL: GraphQLURL,
  UUID: GraphQLUUID,
  JSON: GraphQLJSON,
};

const resolvers = [
  customScalarResolvers,
  accountResolvers,
  articleResolvers,
  categoryResolvers,
  contentResolvers,
  contentTypeResolvers,
  entityResolvers,
  fileResolvers,
  mediaResolvers,
  menuResolvers,
  menuDetailResolvers,
  pageResolvers,
  profileResolvers,
  roleResolvers,
  settingResolvers,
  tagResolvers,
];

export default mergeResolvers(resolvers);

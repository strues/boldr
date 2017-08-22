import { GraphQLEnumType } from 'graphql';

const CONTENT_STATUS = new GraphQLEnumType({
  name: 'CONTENT_STATUS',
  description: 'Variations of status for content',
  values: {
    PUBLISHED: { value: 'published' },
    ARCHIVED: { value: 'archived' },
    DRAFT: { value: 'draft' },
  },
});

export default CONTENT_STATUS;

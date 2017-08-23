import { GraphQLEnumType } from 'graphql';

const ORDER = new GraphQLEnumType({
  name: 'ORDER',
  description: 'Order sort attribute ascending or descending.',
  values: {
    ASC: { value: 'asc' },
    DESC: { value: 'desc' },
  },
});

export default ORDER;

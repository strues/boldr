/* @flow */
import { graphql } from 'react-apollo';
// internal
import Tags from './Tags';
import TAGS_QUERY from './gql/tags.graphql';

export default graphql(TAGS_QUERY, {
  options: () => ({
    variables: {
      offset: 0,
      limit: 20,
    },
  }),
})(Tags);

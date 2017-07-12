// @flow
import { gql, graphql } from 'react-apollo';
import GET_ARTICLE_QUERY from './article.graphql';
import Article from './Article';

export default graphql(GET_ARTICLE_QUERY, {
  options: props => ({
    variables: {
      slug: props.match.params.slug,
    },
  }),
})(Article);

// @flow
import { graphql } from 'react-apollo';
import GET_ARTICLE_QUERY from '../gql/article.graphql';
import Article from './Article';

export default graphql(GET_ARTICLE_QUERY, {
  options: props => ({
    variables: {
      slug: props.match.params.slug,
    },
  }),
})(Article);

/* @flow */
import { graphql } from 'react-apollo';
import ARTICLES_FOR_TAG from '../gql/articlesForTag.graphql';
import TagList from './TagList';

export default graphql(ARTICLES_FOR_TAG, {
  options: props => ({
    variables: {
      name: props.match.params.name,
    },
  }),
})(TagList);

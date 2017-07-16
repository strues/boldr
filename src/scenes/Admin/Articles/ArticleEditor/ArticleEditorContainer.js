/* @flow */
import { graphql } from 'react-apollo';
import GET_ARTICLE_QUERY from '../gql/article.graphql';
import ArticleEditor from './ArticleEditor';

export type Props = {
  data: Data,
};
type Data = {
  getArticleBySlug: Article,
  loading: boolean,
};

// $FlowIssue
export default graphql(GET_ARTICLE_QUERY, {
  options: props => ({
    variables: {
      slug: props.match.params.slug,
    },
  }),
})(ArticleEditor);

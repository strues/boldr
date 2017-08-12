/* @flow */
import { graphql } from 'react-apollo';
import GET_ARTICLE_QUERY from '../gql/article.graphql';
import ArticleEditor from './ArticleEditor';

type Data = {
  getArticleBySlug: Article,
  loading: boolean,
};

export type Props = {
  data: Data,
};

// $FlowIssue
export default graphql(GET_ARTICLE_QUERY, {
  options: props => ({
    variables: {
      slug: props.match.params.slug,
    },
  }),
})(ArticleEditor);

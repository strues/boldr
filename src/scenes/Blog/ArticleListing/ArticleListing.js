/* @flow */
import React, { Component } from 'react';
import styled from 'styled-components';
import { compose, gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
// $FlowIssue
import { changeLayout, layoutSelector } from '../../../state/boldr/ui';
import Loader from '../../../components/Loader';
import withApolloFetchingContainer from '../../../components/ApolloFetching';
import View from '../../../components/View';
import { Grid, Row, Col } from '../../../components/Layout';
import { FeaturedArticle, ArticleCard } from '../components';
import ARTICLES_QUERY from './articles.graphql';

type Props = {
  loading: boolean,
  dispatch: Function,
  renderWhenReady: () => any,
  layout: Object,
  handleChangeLayout: () => void,
  changeLayout: () => void,
  data: Data,
};
type Data = {
  articles: Array<Article>,
  loading: boolean,
};
const CardSpacer = styled.div`margin-bottom: 50px;`;
const FeaturedArea = styled.section`
  padding-top: 50px;
  margin-bottom: 40px;
`;
const style = {
  position: 'fixed',
  right: '20px',
  bottom: '70px',
};

class ArticleListing extends Component {
  static defaultProps = {
    data: {
      articles: [],
    },
  };

  props: Props;

  renderArticles = () => {
    const { articles, loading } = this.props.data;
    const allArticles =
      articles.filter(p => p.published) && articles.filter(p => !p.featured);
    return allArticles.map(article =>
      <Col key={article.id} xs={12} md={4}>
        <CardSpacer>
          <ArticleCard article={article} tags={article.tags} />
        </CardSpacer>
      </Col>,
    );
  };

  renderFeature = () => {
    const { articles } = this.props.data;
    const featuredArticles = articles.filter(p => p.featured);
    return featuredArticles.map(article => <FeaturedArticle key={article.id} {...article} />);
  };

  renderBody = () =>
    <div className="boldrui-pad-top">
      {this.renderFeature()}
      <Row>
        {this.renderArticles()}
      </Row>
    </div>;

  render() {
    const { renderWhenReady } = this.props;
    const { articles, loading } = this.props.data;
    return (
      <Grid>
        {renderWhenReady(this.renderBody)}
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    layout: layoutSelector(state),
  };
};

const ArticleListingWithData = compose(
  graphql(ARTICLES_QUERY, {
    options: props => ({
      variables: {
        offset: 0,
        limit: 20,
      },
    }),
  }),
  withApolloFetchingContainer(() =>
    <View marginChildren>
      <Loader />
    </View>,
  ),
)(ArticleListing);
export default connect(mapStateToProps)(ArticleListingWithData);

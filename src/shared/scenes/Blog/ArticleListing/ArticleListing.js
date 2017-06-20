/* @flow */
import React, { Component } from 'react';
import styled from 'styled-components';
import { compose, gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
// $FlowIssue
import { changeLayout, layoutSelector } from '@@state/modules/boldr/ui';
import Loader from '@@components/Loader';
import withApolloFetchingContainer from '@@components/ApolloFetching';
import View from '@@components/View';
import FontIcon from '@@components/FontIcon';
import { Grid, Row, Col } from '@@components/Layout';
import { LAYOUTS } from '../../../core/constants';
import { FeaturedArticle, ArticleCard } from '../components';

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
  getArticles: Array<Article>,
  loading: boolean,
};
const CardSpacer = styled.div`
  margin-bottom: 50px;
`;
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
      getArticles: [],
    },
  };
  props: Props;
  handleChangeLayout = () => {
    this.props.layout === 'grid'
      ? this.props.dispatch(changeLayout(LAYOUTS.LIST))
      : this.props.dispatch(changeLayout(LAYOUTS.GRID));
  };
  renderArticles = () => {
    const { getArticles, loading } = this.props.data;
    const allArticles =
      getArticles.filter(p => p.published) && getArticles.filter(p => !p.featured);
    return allArticles.map(article =>
      <Col key={article.id} xs={12} md={4}>
        <CardSpacer>
          <ArticleCard article={article} tags={article.tags} />
        </CardSpacer>
      </Col>,
    );
  };

  renderFeature = () => {
    const { getArticles, loading } = this.props.data;
    const featuredArticles = loading ? <Loader /> : getArticles.filter(p => p.featured);
    return featuredArticles.map(article =>
      <Col key={article.id} xs={12}>
        <FeaturedArticle {...article} />
      </Col>,
    );
  };

  renderBody = () =>
    <div>
      <Row>{this.renderFeature()}</Row>
      <Row>
        {this.renderArticles()}
      </Row>
    </div>;

  render() {
    const { renderWhenReady } = this.props;
    const { getArticles, loading } = this.props.data;
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

export const ARTICLES_QUERY = gql`
  query getArticles($offset: Int!, $limit: Int!) {
    getArticles(offset: $offset, limit: $limit) {
      id,
      title,
      slug,
      featureImage
      featured
      published
      createdAt
      excerpt
      tags {
        id,
        name
      },
    }
  }
`;

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

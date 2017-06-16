/* @flow */
import React from 'react';
import styled from 'styled-components';
import { gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
// $FlowIssue
import { changeLayout, layoutSelector } from '~state/modules/boldr/ui';
import Loader from '~components/Loader';
import FontIcon from '~components/FontIcon';
import { Grid, Row, Col } from '~components/Layout';
import { LAYOUTS } from '../../../core/constants';
import { FeaturedArticle, ArticleCard } from '../components';

type Props = {
  loading: boolean,
  dispatch: Function,
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

class ArticleListing extends React.Component {
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
    return getArticles.map(article =>
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
  render() {
    const { getArticles, loading } = this.props.data;
    if (loading && !getArticles) {
      return <Loader />;
    } else {
      return (
        <Grid>
          <Row>
            {getArticles.map(article =>
              <Col key={article.id} xs={12} md={4}>
                <CardSpacer>
                  <ArticleCard article={article} tags={article.tags} />
                </CardSpacer>
              </Col>,
            )}
          </Row>
        </Grid>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    layout: layoutSelector(state),
  };
};

const ARTICLES_QUERY = gql`
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

const ArticleListingWithData = graphql(ARTICLES_QUERY, {
  options: props => ({
    variables: {
      offset: 0,
      limit: 20,
    },
  }),
})(ArticleListing);
export default connect(mapStateToProps)(ArticleListingWithData);

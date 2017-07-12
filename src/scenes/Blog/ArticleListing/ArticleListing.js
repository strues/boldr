/* @flow */
import React, { Component } from 'react';
import styled from 'styled-components';
import { compose, gql, graphql } from 'react-apollo';
import Helmet from 'react-helmet';
import Loader from '../../../components/Loader';
import { Grid, Row, Col } from '../../../components/Layout';
import { FeaturedArticle, ArticleCard } from '../components';

export type Props = {
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
    const allArticles = articles.filter(p => p.published) && articles.filter(p => !p.featured);
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
    return (
      <Grid>
        {renderWhenReady(this.renderBody)}
      </Grid>
    );
  }
}

export default ArticleListing;

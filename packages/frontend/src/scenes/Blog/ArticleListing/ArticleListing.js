/* @flow */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid, Row, Col } from '@boldr/ui/Layout';
import { FeaturedArticle, ArticleCard } from '../components';

export type Props = {
  renderWhenReady: () => any,
  data: Data,
};
type Data = {
  articles: Array<Article>,
};

const CardSpacer = styled.div`margin-bottom: 50px;`;

class ArticleListing extends Component {
  static defaultProps = {
    data: {
      articles: [],
    },
  };

  props: Props;

  renderArticles = () => {
    const { articles } = this.props.data;
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

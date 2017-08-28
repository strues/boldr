/* @flow */
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Grid, Row, Col } from '@boldr/ui/Layout';
import { FeaturedArticle, ArticleCard } from '../components';
import type { ArticleType } from '../../../types/boldr';

type Props = {
  articles: ArticleType,
  isLoading: boolean,
  error?: Object,
};

const CardSpacer = styled.div`margin-bottom: 50px;`;

class ArticleListing extends PureComponent<Props, *> {
  props: Props;

  renderArticles = () => {
    const { articles } = this.props;
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
    const { articles } = this.props;
    const featuredArticles = articles.filter(p => p.featured);
    return featuredArticles.map(article => <FeaturedArticle key={article.id} {...article} />);
  };

  render() {
    return (
      <Grid fluid={false}>
        <div className="boldrui-pad-top">
          {this.renderFeature()}
          <Row>
            {this.renderArticles()}
          </Row>
        </div>
      </Grid>
    );
  }
}

export default ArticleListing;

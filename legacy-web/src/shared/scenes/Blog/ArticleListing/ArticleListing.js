/* @flow */
import React from 'react';
import styled from 'styled-components';
import Loader from '~components/Loader';
import FontIcon from '~components/FontIcon';
// import Button from 'material-ui/Button';
import { Grid, Row, Col } from '~components/Layout';
import { FeaturedArticle, ArticleCard } from '../components';

type Props = {
  loading: boolean,
  layout: Object,
  handleChangeLayout: () => void,
  articles: Array<Article>,
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

  renderArticles = () => {
    const { articles } = this.props;
    const allArticles =
      articles.filter(p => p.published) && articles.filter(p => !p.featured);
    return allArticles.map(article => (
      <Col key={article.id} xs={12} md={4}>
        <CardSpacer>
          <ArticleCard article={article} tags={article.tags} />
        </CardSpacer>
      </Col>
    ));
  };
  renderFeature = () => {
    const { articles, loading } = this.props;
    const featuredArticles = loading
      ? <Loader />
      : articles.filter(p => p.featured);
    return featuredArticles.map(article => (
      <Col key={article.id} xs={12}>
        <FeaturedArticle {...article} />
      </Col>
    ));
  };
  render() {
    if (this.props.loading) {
      return <Loader />;
    }
    return (
      <Grid fluid={false}>
        <FeaturedArea>
          {this.renderFeature()}
        </FeaturedArea>
        <Row>
          {this.renderArticles()}
        </Row>
      </Grid>
    );
  }
}
export default ArticleListing;

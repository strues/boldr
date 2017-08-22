// @flow
import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import HeroArticle from '@boldr/ui/Hero/HeroArticle';
import Loader from '@boldr/ui/Loader';
import { Grid, Row, Col } from '@boldr/ui/Layout';
import { ArticleSidebar, ArticleContent, ArticleTitle } from '../components';
import { StyleClasses } from '../../../theme/styleClasses';

const BASE_ELEMENT = StyleClasses.ARTICLE_SINGLE;

export type Props = {
  loading: boolean,
  className?: string,
  data: Object,
  isLoading: boolean,
  error?: Object,
  article: Object,
  sidebarClassName?: string,
};

class Article extends PureComponent<Props, *> {
  props: Props;

  displaySingleArticle = () => {
    const { article, className } = this.props;
    const classes = classnames(BASE_ELEMENT, className);
    return (
      <div className={classes}>
        <Helmet title={article.title} />
        <HeroArticle bgImg={article.image}>
          <ArticleTitle title={article.title} />
        </HeroArticle>
        <Grid>
          <Row>
            <Col xs={12} md={8} lg={9}>
              <ArticleContent {...article} />
            </Col>
            {this.renderArticleSidebar()}
          </Row>
        </Grid>
      </div>
    );
  };

  renderArticleSidebar = () => {
    const { article } = this.props;

    return (
      <Col xs={12} md={4} lg={3}>
        <ArticleSidebar
          author={article.author}
          tags={article.tags}
          className={this.props.sidebarClassName}
        />
      </Col>
    );
  };

  render() {
    if (this.props.isLoading && !this.props.article) {
      return <Loader />;
    } else {
      return (
        <div className="single-article">
          <Helmet title="article" />
          {this.displaySingleArticle()}
        </div>
      );
    }
  }
}

export default Article;

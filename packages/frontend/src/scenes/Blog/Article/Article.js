// @flow
import React, { Component } from 'react';
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
  className: ?string,
  data: Object,
  sidebarClassName: ?string,
};

class Article extends Component {
  props: Props;

  displaySingleArticle = () => {
    const { data: { getArticleBySlug }, className } = this.props;
    const classes = classnames(BASE_ELEMENT, className);
    return (
      <div className={classes}>
        <Helmet title={getArticleBySlug.title} />
        <HeroArticle bgImg={getArticleBySlug.image}>
          <ArticleTitle title={getArticleBySlug.title} />
        </HeroArticle>
        <Grid>
          <Row>
            <Col xs={12} md={8} lg={9}>
              <ArticleContent {...getArticleBySlug} />
            </Col>
            {this.renderArticleSidebar()}
          </Row>
        </Grid>
      </div>
    );
  };

  renderArticleSidebar = () => {
    const { getArticleBySlug } = this.props.data;

    return (
      <Col xs={12} md={4} lg={3}>
        <ArticleSidebar
          author={getArticleBySlug.author}
          tags={getArticleBySlug.tags}
          className={this.props.sidebarClassName}
        />
      </Col>
    );
  };

  render() {
    if (this.props.data.loading && !this.props.data.getArticleBySlug) {
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

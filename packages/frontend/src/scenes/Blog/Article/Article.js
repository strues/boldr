// @flow
import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import styled from 'styled-components';
import Link from 'react-router-dom/Link';
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

const ArticleFooter = styled.footer`@media (min-width: 700px) {padding: 70px 100px 0;}`;

const AuthorCardLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const AuthorImage = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 15px;
  border-radius: 50%;
`;

const AuthorCardContent = styled.section``;

const AuthorName = styled.h4`
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  margin: 0 0 5px;
`;

const AuthorBio = styled.p`
  margin: 0;
  color: #738a94;
  font-size: 13px;
  line-height: 18px;
  font-weight: 300;
  @media (min-width: 700px) {
    font-size: 18px;
    line-height: 22px;
  }
`;
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
              <ArticleFooter>
                <AuthorCardLink to={`/profiles/${article.author.profile.username}`}>
                  <AuthorImage src={article.author.profile.avatarUrl} />
                  <AuthorCardContent>
                    <AuthorName>{article.author.profile.username}</AuthorName>
                    <AuthorBio>{article.author.profile.bio}</AuthorBio>
                  </AuthorCardContent>
                </AuthorCardLink>
              </ArticleFooter>
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

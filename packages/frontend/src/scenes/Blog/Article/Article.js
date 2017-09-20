// @flow
import React from 'react';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import HeroArticle from '@boldr/ui/Hero/HeroArticle';
import Loader from '@boldr/ui/Loader';
import { Grid, Row, Col } from '@boldr/ui/Layout';
import { ArticleContent, ArticleTitle, ArticleFooter } from '../components';
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

class Article extends React.PureComponent<Props, *> {
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
            <Col xs>
              <ArticleContent {...article} />
              <ArticleFooter
                avatarUrl={article.author.profile.avatarUrl}
                username={article.author.profile.username}
                firstName={article.author.profile.firstName}
                lastName={article.author.profile.lastName}
                bio={article.author.profile.bio}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  };

  render() {
    const { article, isLoading } = this.props;
    if (isLoading && !article) {
      return <Loader />;
    } else {
      return (
        <div className="single-article">
          <Helmet title={article.title} />
          {this.displaySingleArticle()}
        </div>
      );
    }
  }
}

export default Article;

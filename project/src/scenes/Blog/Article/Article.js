// @flow
import React from 'react';
import Helmet from 'react-helmet';
import cn from 'classnames';
import HeroArticle from '@boldr/ui/Hero/HeroArticle';
import Loader from '@boldr/ui/Loader';
import { Grid, Row, Col } from '@boldr/ui/Layout';
import Page from '../../../pages/Page';
import { ArticleContent, ArticleTitle, ArticleFooter } from '../components';
import { StyleClasses } from '../../../theme/styleClasses';
import type { ArticleType } from '../../../types/boldr';

const BASE_ELEMENT = StyleClasses.ARTICLE_SINGLE;

export type Props = {
  className?: string,
  isLoading: boolean,
  error?: Object,
  article: ArticleType,
};

class Article extends React.PureComponent<Props, *> {
  render() {
    const { article, isLoading, className } = this.props;

    const classes = cn(BASE_ELEMENT, className);
    if (isLoading && !article) {
      return <Loader />;
    } else {
      return (
        <Page>
          <div className="single-article">
            <Helmet title={article.title} />
            <div className={classes}>
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
          </div>
        </Page>
      );
    }
  }
}

export default Article;

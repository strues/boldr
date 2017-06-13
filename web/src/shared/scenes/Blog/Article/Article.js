// @flow
import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import classnames from 'classnames';
import { StyleClasses, Loader } from 'boldr-ui';
import { gql, graphql } from 'react-apollo';
import { Grid, Row, Col } from '~components/Layout';
import { ArticleSidebar, ArticleContent, ArticleTitle } from '../components';
import BaseTemplate from '../../../templates/BaseTemplate';

const BASE_ELEMENT = StyleClasses.SINGLE_POST;

export type Props = {
  loading: boolean,
  className: ?string,
  data: Object,
  articleBySlug: Object,
  sidebarClassName: ?string,
  match: Object,
  fetchArticleIfNeeded: (slug: string) => void,
  dispatch: Function,
  params: Object,
};

class Article extends PureComponent {
  props: Props;

  displaySingleArticle = () => {
    const { data: { getArticleBySlug }, className } = this.props;
    const classes = classnames(BASE_ELEMENT, className);
    return (
      <BaseTemplate
        bgImg={getArticleBySlug.featureImage}
        heroContent={<ArticleTitle title={getArticleBySlug.title} />}
        articleTitle={getArticleBySlug.title}
        helmetMeta={<Helmet title={getArticleBySlug.title} />}
      >
        <div className={classes}>
          <Grid>
            <Row>
              <Col xs={12} md={8} lg={9}>
                <ArticleContent {...getArticleBySlug} />
              </Col>
              {this.renderArticleSidebar()}
            </Row>
          </Grid>
        </div>
      </BaseTemplate>
    );
  };

  renderArticleSidebar = () => {
    const { getArticleBySlug } = this.props.data;

    return (
      <Col xs={12} md={4} lg={3}>
        <ArticleSidebar
          authorId={getArticleBySlug.userId}
          tags={getArticleBySlug.tags}
          className={this.props.sidebarClassName}
        />
      </Col>
    );
  };

  render() {
    if (this.props.data.loading) {
      return <Loader />;
    }
    return (
      <div>
        <Helmet title="article" />
        {this.displaySingleArticle()}
      </div>
    );
  }
}

export default graphql(
  gql`
  query getArticleBySlug($slug: String!) {
      getArticleBySlug(slug: $slug) {
        id,
        title,
        content,
        slug,
        featureImage,
        backgroundImage,
        createdAt,
        userId,
        tags {
          id,
          name
        }
      }
  }
`,
  {
    options: props => ({
      variables: {
        slug: props.match.params.slug,
      },
    }),
  },
)(Article);

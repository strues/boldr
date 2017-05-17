// @flow
import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import classnames from 'classnames';
import { Grid, Row, Col, StyleClasses, Loader } from 'boldr-ui';
import { gql, graphql } from 'react-apollo';
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
    const { data: { articleBySlug }, className } = this.props;
    const classes = classnames(BASE_ELEMENT, className);
    return (
      <BaseTemplate helmetMeta={<Helmet title={articleBySlug.title} />}>
        <div className={classes}>
          {this.renderPostBg()}
          <Grid>
            <Row>
              <Col sm={12} md={8} lg={9}>
                <ArticleContent {...articleBySlug} />
              </Col>
              {this.renderArticleSidebar()}
            </Row>
          </Grid>
        </div>
      </BaseTemplate>
    );
  };

  renderArticleSidebar = () => {
    const { articleBySlug } = this.props.data;

    return (
      <Col sm={12} md={4} lg={3}>
        <ArticleSidebar
          authorId={articleBySlug.userId}
          tags={articleBySlug.tags}
          className={this.props.sidebarClassName}
        />
      </Col>
    );
  };
  renderPostBg = () => {
    const { articleBySlug } = this.props.data;
    const PostBg = styled.section`
    max-height: 400px;
    min-height: 400px;
    height: 100%;
    overflow: hidden;
    width: 100%;
    background-size: cover;
    background-attachment: fixed;
    background-image: url(${articleBySlug.featureImage});
    align-items: center;
    background-position-x: 50%;
    background-position-y: 50%;
    margin-bottom: 30px;

  `;
    return <PostBg><ArticleTitle title={articleBySlug.title} /></PostBg>;
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
  query article($slug: String!) {
      articleBySlug(slug: $slug) {
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

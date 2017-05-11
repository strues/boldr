// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import classnames from 'classnames';
import { Grid, Row, Col, StyleClasses } from 'boldr-ui';

import { fetchArticleIfNeeded } from '../state/articles';
import { ArticleSidebar, ArticleContent, ArticleTitle } from '../components';
import BaseTemplate from '../../../templates/BaseTemplate';

const BASE_ELEMENT = StyleClasses.SINGLE_POST;

export type Props = {
  loading: boolean,
  className: ?string,
  entities: Object,
  currentArticle: Object,
  sidebarClassName: ?string,
  match: Object,
  fetchArticleIfNeeded: (slug: string) => void,
  dispatch: Function,
  params: Object,
};

class Article extends PureComponent {
  static defaultProps: {
    currentArticle: {},
    match: { params: { slug: '' } },
    fetchArticleIfNeeded: () => {},
  };

  componentDidMount() {
    const { fetchArticleIfNeeded, match: { params } } = this.props;

    fetchArticleIfNeeded(params.slug);
  }
  props: Props;

  displaySingleArticle = () => {
    const { currentArticle, entities, className } = this.props;
    const { author } = currentArticle;
    const classes = classnames(BASE_ELEMENT, className);
    return (
      <BaseTemplate helmetMeta={<Helmet title={currentArticle.title} />}>
        <div className={classes}>
          {this.renderPostBg()}
          <Grid>
            <Row>
              <Col sm={12} md={8} lg={9}>
                <ArticleContent {...currentArticle} />
              </Col>
              {!currentArticle.tags
                ? null
                : <Col sm={12} md={4} lg={3}>
                    <ArticleSidebar
                      articleAuthor={entities.users[author]}
                      articleTags={currentArticle.tags.map(
                        id => entities.tags[id],
                      )}
                      className={this.props.sidebarClassName}
                      {...currentArticle}
                    />
                  </Col>}
            </Row>
          </Grid>
        </div>
      </BaseTemplate>
    );
  };
  renderPostBg = () => {
    const { currentArticle } = this.props;
    const PostBg = styled.section`
      max-height: 400px;
      min-height: 400px;
      height: 100%;
      overflow: hidden;
      width: 100%;
      background-size: cover;
      background-attachment: fixed;
      background-image: url(${currentArticle.featureImage});
      align-items: center;
      background-position-x: 0px;
      background-position-y: 0px;
      margin-bottom: 30px;
    `;
    return <PostBg><ArticleTitle title={currentArticle.title} /></PostBg>;
  };
  render() {
    const { currentArticle } = this.props;

    return (
      <div>
        <Helmet title={currentArticle.title} />
        {this.displaySingleArticle()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    entities: state.entities,
    currentArticle: state.blog.articles.currentArticle,
  };
};

export default connect(mapStateToProps, { fetchArticleIfNeeded })(Article);

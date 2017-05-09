// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
// $FlowIssue
import styled from 'styled-components';
import classnames from 'classnames';
import { Grid, Row, Col, StyleClasses } from 'boldr-ui';

import { getPosts, fetchPostIfNeeded } from '../state/posts';
import { PostSidebar, PostContent, PostTitle } from '../components';
import BaseTemplate from '../../../templates/BaseTemplate';

const BASE_ELEMENT = StyleClasses.SINGLE_POST;

export type Props = {
  loading: boolean,
  className: ?string,
  entities: Object,
  currentPost: Object,
  sidebarClassName: ?string,
  match: Object,
  fetchPostIfNeeded: (slug: string) => void,
  dispatch: Function,
  params: Object,
};

class SinglePost extends PureComponent {
  static defaultProps: {
    currentPost: {},
    match: { params: { slug: '' } },
    fetchPostIfNeeded: () => {},
  };

  componentDidMount() {
    const { fetchPostIfNeeded, match: { params } } = this.props;

    fetchPostIfNeeded(params.slug);
  }
  props: Props;

  displaySinglePost = () => {
    const { currentPost, entities, className } = this.props;
    const { author } = currentPost;
    const postAuthor = entities.users[author];

    const classes = classnames(BASE_ELEMENT, className);
    return (
      <BaseTemplate helmetMeta={<Helmet title={currentPost.title} />}>
        <div className={classes}>
          {this.renderPostBg()}
          <Grid>
            <Row>
              <Col sm={12} md={8} lg={9}>
                <PostContent {...currentPost} />
              </Col>
              {!currentPost.tags
                ? null
                : <Col sm={12} md={4} lg={3}>
                    <PostSidebar
                      postAuthor={entities.users[author]}
                      postTags={currentPost.tags.map(id => entities.tags[id])}
                      className={this.props.sidebarClassName}
                      {...currentPost}
                    />
                  </Col>}
            </Row>
          </Grid>
        </div>
      </BaseTemplate>
    );
  };
  renderPostBg = () => {
    const { currentPost } = this.props;
    const PostBg = styled.section`
      max-height: 400px;
      min-height: 400px;
      height: 100%;
      overflow: hidden;
      width: 100%;
      background-size: cover;
      background-attachment: fixed;
      background-image: url(${currentPost.featureImage});
      align-items: center;
      background-position-x: 0px;
      background-position-y: 0px;
      margin-bottom: 30px;
    `;
    return <PostBg><PostTitle title={currentPost.title} /></PostBg>;
  };
  render() {
    const { currentPost } = this.props;

    return (
      <div>
        <Helmet title={currentPost.title} />
        {this.displaySinglePost()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    entities: state.entities,
    currentPost: state.blog.posts.currentPost,
  };
};

export default connect(mapStateToProps, { fetchPostIfNeeded })(SinglePost);

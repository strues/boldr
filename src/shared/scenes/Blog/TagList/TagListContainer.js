/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Col, Row, Loader } from 'boldr-ui';
import Helmet from 'react-helmet';
import { getPosts } from '../../../state/modules/blog/posts';
import BaseTemplate from '../../../templates/BaseTemplate';
import { fetchTagsIfNeeded, fetchTagPostsIfNeeded } from '../../../state/modules/blog/tags/actions';
import TagList from './TagList';

type Props = {
  currentTag: Object,
  isFetching: boolean,
  posts: Array<Object>,
  params: Object,
  match: Object,
  listTags: Object,
  fetchTagPostsIfNeeded: () => void,
};

export class TagListContainer extends Component {
  static defaultProps: {
    match: {params: {name: ''}},
    fetchTagPostsIfNeeded: () => {},
  };

  componentDidMount() {
    const { fetchTagPostsIfNeeded, match: { params } } = this.props;

    fetchTagPostsIfNeeded(params.name);
  }

  props: Props;
  render() {
    const { match: { params } } = this.props;
    if (this.props.isFetching) {
      return <Loader />;
    }
    return (
      <BaseTemplate helmetMeta={ <Helmet title={ `Posts tagged ${params.name}` } /> }>
        <TagList isFetching={ this.props.isFetching } listTags={ this.props.listTags } posts={ this.props.posts } />
      </BaseTemplate>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: getPosts(state),
    listTags: state.blog.tags.all,
    isFetching: state.blog.tags.isFetching,
    currentTag: state.blog.tags.currentTag,
  };
};

export default connect(mapStateToProps, { fetchTagPostsIfNeeded })(TagListContainer);

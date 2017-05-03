/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { LAYOUTS } from '../../../core/constants';
import { changeLayout, layoutSelector } from '../../../state/modules/boldr/ui';
import { getPosts, fetchPostsIfNeeded } from '../state/posts';
import { fetchTagsIfNeeded } from '../state/tags/actions';
import BaseTemplate from '../../../templates/BaseTemplate';
import VisiblePostListing from './VisiblePostListing';

type Props = {
  posts: Array<Post>,
  isFetching: boolean,
  listTags: Object,
  layout: string,
  dispatch: Function,
  fetchTagsIfNeeded: () => void,
  changeLayout: () => void,
  handleChangeLayout: () => void,
  fetchPostsIfNeeded: () => void,
};

export class PostListingContainer extends Component {
  static defaultProps: {
    fetchPostsIfNeeded: () => {},
    fetchTagsIfNeeded: () => {},
  };

  componentDidMount() {
    Promise.all([
      this.props.dispatch(fetchPostsIfNeeded()),
      this.props.dispatch(fetchTagsIfNeeded()),
    ]);
  }

  props: Props;
  handleChangeLayout = () => {
    this.props.layout === 'grid'
      ? this.props.dispatch(changeLayout(LAYOUTS.LIST))
      : this.props.dispatch(changeLayout(LAYOUTS.GRID));
  };
  render() {
    return (
      <BaseTemplate helmetMeta={<Helmet title="Blog Posts" />}>
        <VisiblePostListing
          posts={this.props.posts}
          listTags={this.props.listTags}
          layout={this.props.layout}
          handleChangeLayout={this.handleChangeLayout}
          isFetching={this.props.isFetching}
        />
      </BaseTemplate>
    );
  }
}

const mapStateToProps = state => {
  return {
    listTags: state.entities.tags,
    posts: getPosts(state),
    layout: layoutSelector(state),
    isFetching: state.blog.posts.isFetching,
  };
};

export default connect(mapStateToProps)(PostListingContainer);

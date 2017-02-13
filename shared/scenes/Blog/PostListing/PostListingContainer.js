/* @flow */

import React, { Component } from 'react';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { LAYOUTS } from '../../../core/constants';
import { changeLayout } from '../../../state/modules/boldr/ui';
import { getPosts, fetchPostsIfNeeded } from '../../../state/modules/blog/posts';
import { fetchTagsIfNeeded } from '../../../state/modules/blog/tags/actions';
import { getTags } from '../../../state/modules/blog/tags/selectors';
import type { Post, UI } from '../../../types/models'; // eslint-disable-line
import VisiblePostListing from './VisiblePostListing';
import FeaturedPostListing from './FeaturedPostListing';

type Props = {
  posts: Array<Post>,
  isFetching: Boolean,
  listTags: Object,
  layout: string,
  fetchTagsIfNeeded: () => void,
  changeLayout: () => void,
  handleChangeLayout: () => void,
  fetchPostsIfNeeded: () => void,
};

@provideHooks({
  fetch: ({ dispatch }) => {
    return dispatch(fetchPostsIfNeeded());
  },
  defer: ({ dispatch }) => {
    return dispatch(fetchTagsIfNeeded());
  },
})
export class PostListingContainer extends Component {
  props: Props;
  handleChangeLayout = () => {
    this.props.layout === 'grid'
    ? this.props.changeLayout(LAYOUTS.LIST)
    : this.props.changeLayout(LAYOUTS.GRID);
  }
  render() {
    return (
      <div>
        <FeaturedPostListing
          posts={ this.props.posts }
          listTags={ this.props.listTags }
          layout={ this.props.layout }
          handleChangeLayout={ this.handleChangeLayout }
          isFetching={ this.props.isFetching }
        />
        <VisiblePostListing
          posts={ this.props.posts }
          listTags={ this.props.listTags }
          layout={ this.props.layout }
          handleChangeLayout={ this.handleChangeLayout }
          isFetching={ this.props.isFetching }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listTags: state.blog.tags.all,
    posts: getPosts(state),
    layout: state.boldr.ui.layout,
    isFetching: state.blog.posts.isFetching,
  };
};

export default connect(mapStateToProps, {
  fetchPostsIfNeeded, changeLayout, fetchTagsIfNeeded,
})(PostListingContainer);


/* @flow */
import React, { Component } from 'react';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { LAYOUTS } from '../../../core/constants';
import { changeLayout } from '../../../state/modules/boldr/ui';
import { getPosts, fetchPostsIfNeeded } from '../../../state/modules/blog/posts';

import type { Post } from '../../../types/models'; // eslint-disable-line
import PostListing from './PostListing';

type Props = {
  posts: Array<Post>,
  loading: ?Boolean,
  ui: Object,
  changeLayout: () => void,
  handleChangeLayout: () => void,
  fetchPostsIfNeeded: () => void,
};

@provideHooks({
  fetch: ({ dispatch }) => {
    return dispatch(fetchPostsIfNeeded());
  },
})
export class PostListingContainer extends Component {
  constructor() {
    super();
    (this: any).handleChangeLayout = this.handleChangeLayout.bind(this);
  }
  componentDidMount() {
    this.props.fetchPostsIfNeeded();
  }

  props: Props;
  handleChangeLayout() {
    this.props.ui.layout === 'grid'
    ? this.props.changeLayout(LAYOUTS.LIST)
    : this.props.changeLayout(LAYOUTS.GRID);
  }
  render() {
    return (
      <PostListing
        posts={ this.props.posts }
        layout={ this.props.ui.layout }
        handleChangeLayout={ this.handleChangeLayout }
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: getPosts(state),
    ui: state.boldr.ui,
  };
};

export default connect(mapStateToProps, {
  fetchPostsIfNeeded, changeLayout,
})(PostListingContainer);

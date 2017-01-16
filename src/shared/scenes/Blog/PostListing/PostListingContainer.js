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

type Props = {
  posts: Array<Post>,
  loading: ?Boolean,
  listTags: Object,
  ui: UI,
  fetchTagsIfNeeded: () => void,
  changeLayout: () => void,
  handleChangeLayout: () => void,
  fetchPostsIfNeeded: () => void,
};

@provideHooks({
  fetch: ({ dispatch }) => {
    return Promise.all([
      dispatch(fetchPostsIfNeeded()),
      dispatch(fetchTagsIfNeeded()),
    ]);
  },
})
export class PostListingContainer extends Component {
  constructor() {
    super();
    (this: any).handleChangeLayout = this.handleChangeLayout.bind(this);
  }
  componentDidMount() {
    this.props.fetchTagsIfNeeded();
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
      <VisiblePostListing
        posts={ this.props.posts }
        listTags={ this.props.listTags }
        layout={ this.props.ui.layout }
        handleChangeLayout={ this.handleChangeLayout }
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listTags: state.blog.tags.all,
    posts: getPosts(state),
    ui: state.boldr.ui,
  };
};

export default connect(mapStateToProps, {
  fetchPostsIfNeeded, changeLayout, fetchTagsIfNeeded,
})(PostListingContainer);

/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import { fetchTaggedPost } from '../../../../../state/modules/blog/tags/actions';

type Props = {
  currentTag: Object,
  isFetching: boolean,
  name: string,
  listTags: Object,
  dispatch: () => void,
};

@provideHooks({
  fetch: ({ dispatch, params: { name } }) => dispatch(fetchTaggedPost(name)),
})
class TaggedPost extends Component {

  componentDidMount() {
    const name = this.props.name;
    this.props.dispatch(fetchTaggedPost(name));
  }
  props: Props;
  render() {
    if (this.props.isFetching) {
      return (
        <div>Loading posts...</div>
      );
    }
    if (!this.props.currentTag) {
      return (
        <div>NO posts matching the tag</div>
      );
    }

    return (
      <List>
        {
          this.props.currentTag.posts.map(post =>
            <ListItem key={ post.id } primaryText={ post.title } />
          )
        }
      </List>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listTags: state.blog.tags.all,
    isFetching: state.blog.tags.isFetching,
    currentTag: state.blog.tags.currentTag,
  };
};

export default connect(mapStateToProps)(TaggedPost);

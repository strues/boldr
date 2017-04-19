/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import { Toolbar, MenuButton, List, ListItem, Loader } from 'boldr-ui';

import {
  fetchTagPostsIfNeeded,
} from '../../../../../state/modules/blog/tags/actions';
import TaggedPostMenu from '../TaggedPostMenu';

type Props = {
  currentTag: Object,
  isFetching: boolean,
  name: string,
  listTags: Object,
  match: Object,
  fetchTagPostsIfNeeded: (name: string) => void,
  dispatch: () => void,
};

class TaggedPost extends Component {
  static defaultProps: {
    currentTag: {},
  };

  props: Props;
  render() {
    const { currentTag, isFetching } = this.props;
    if (isFetching) {
      return <Loader />;
    }
    if (!currentTag.posts) {
      return <div>NO posts matching the tag</div>;
    }

    return (
      <div>
        <Toolbar
          colored
          title={`Posts tagged ${currentTag.name}`}
          nav={null}
          actions={null}
        />
        <List>
          {currentTag.posts &&
            currentTag.posts.map(post => (
              <ListItem
                key={post.id}
                primaryText={post.title}
                rightAvatar={<TaggedPostMenu post={post} />}
              />
            ))}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listTags: state.blog.tags.all,
    isFetching: state.blog.tags.isFetching,
    currentTag: state.blog.tags.currentTag,
  };
};

export default connect(mapStateToProps, { fetchTagPostsIfNeeded })(TaggedPost);

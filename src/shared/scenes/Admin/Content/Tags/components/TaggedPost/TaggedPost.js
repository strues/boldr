/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import { Loader } from 'boldr-ui';

import { fetchTagArticlesIfNeeded } from '../../../../../Blog/state';

type Props = {
  currentTag: Object,
  isFetching: boolean,
  name: string,
  listTags: Object,
  match: Object,
  fetchTagArticlesIfNeeded: (name: string) => void,
  dispatch: () => void,
};

class TaggedPost extends Component {
  static defaultProps: {
    currentTag: {},
  };

  componentDidMount() {
    const tagName = this.props.match.params.name;
    this.props.fetchTagArticlesIfNeeded(tagName);
  }

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
        <Toolbar>
          <ToolbarTitle text={`Posts tagged ${currentTag.name}`} />
        </Toolbar>
        <List>
          {currentTag.posts &&
            currentTag.posts.map(post => (
              <ListItem key={post.id} primaryText={post.title} />
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

export default connect(mapStateToProps, { fetchTagArticlesIfNeeded })(
  TaggedPost,
);

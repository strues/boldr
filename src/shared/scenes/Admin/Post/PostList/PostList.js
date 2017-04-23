/* @flow */
import React, { Component } from 'react';
import { Card } from 'boldr-ui';
import Helmet from 'react-helmet';

import { selectPost } from '../../../Blog/state';
import PostTable from './components/PostTable';

type Props = {
  posts: Array<Post>,
  post: Post,
  id: String,
  handleDeleteClick: Function,
  handleArticlePublishClick: Function,
  handleArticleDraftClick: Function,
  dispatch: Function,
};

class PostList extends Component {
  props: Props;
  render() {
    return (
      <div>
        <Helmet title="Admin: Post List" />
        <Card tableCard>
          <PostTable
            posts={this.props.posts}
            handleDeleteClick={this.props.handleDeleteClick}
          />
        </Card>
      </div>
    );
  }
}

export default PostList;

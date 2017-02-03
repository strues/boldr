/* @flow */
import React from 'react';
import Card from 'react-md/lib/Cards/Card';
import type { Post } from '../../../../types/models';
import { selectPost } from '../../../../state/modules/blog/posts/actions';
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

const PostList = (props: Props) => {
  return (
    <div>
      <Card tableCard>
        <PostTable posts={ props.posts } handleDeleteClick={ props.handleDeleteClick } />
      </Card>
    </div>
  );
};

export default PostList;

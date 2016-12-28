/* @flow */
import React from 'react';
import Paper from 'material-ui/Paper';
import List from 'material-ui/List';
import type { Post } from 'types/models';
import { PostListItem } from '../components';

export type Props = {
  posts: Array<Post>,
  handleArticleClick: () => void,
  handleDeleteClick: () => void,
};

const PostList = (props: Props) => {
  return (
      <div>
       <Paper zDepth={ 1 }>
       <List>
        {
          props.posts.map(post => (
           <PostListItem
             key={ post.slug }
             id={ post.id }
             slug={ post.slug }
             excerpt={ post.excerpt }
             content={ post.content }
             feature_image={ post.feature_image }
             title={ post.title }
             status={ post.status }
             created_at={ post.created_at }
             handleDeleteClick={ props.handleDeleteClick }
             handleArticleClick={ props.handleArticleClick }
           />
         ))
        }
        </List>
      </Paper>
      </div>
  );
};

export default PostList;

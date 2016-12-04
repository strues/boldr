/* @flow */
import React from 'react';
import { Item, Segment } from 'semantic-ui-react';
import { Icon } from 'components/index';
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
       <Segment>
       <Item.Group>
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
        </Item.Group>
      </Segment>
      </div>
  );
};

export default PostList;

/* @flow */
/* eslint-disable react/prop-types, react/jsx-no-bind */
import React from 'react';
import {TableBody} from 'boldr-ui';
import PostTableRow from './PostTableRow';

type Props = {
  posts: Array<Post>,
};
const PostTableBody = (props: Props) => {
  const {posts} = props;
  return (
    <TableBody>
      {posts.map(post => (
        <PostTableRow
          key={post.id || `${post.slug}`}
          id={post.id}
          slug={post.slug}
          title={post.title}
          published={post.published}
          createdAt={post.createdAt}
          featureImage={post.featureImage}
        />
      ))}
    </TableBody>
  );
};
export default PostTableBody;

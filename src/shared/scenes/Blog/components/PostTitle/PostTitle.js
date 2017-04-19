/* @flow */
import React from 'react';

const PostTitle = (props: { title: string, classname: ?string }) => {
  let classN = 'boldr-post__title';
  if (props.classname) {
    classN = `${props.classname} boldr-post__title`;
  }

  return <h1 className={classN}>{props.title}</h1>;
};

export default PostTitle;

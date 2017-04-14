/* @flow */
import React, { PropTypes } from 'react';

type props = {
  title: string,
  classname: ?string,
};
const PostTitle = (props: Props) => {
  let classN = 'boldr-post__title';
  if (props.classname) {
    classN = `${props.classname} boldr-post__title`;
  }

  return <h1 className={ classN }>{props.title}</h1>;
};

export default PostTitle;

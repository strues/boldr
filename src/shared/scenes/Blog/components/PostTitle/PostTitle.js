import React, { PropTypes } from 'react';

const PostTitle = (props) => {
  let classN = 'boldr-post__title';
  if (props.classname) {
    classN = `${props.classname} boldr-post__title`;
  }

  return <h1 className={ classN }>{ props.title }</h1>;
};

export default PostTitle;

PostTitle.propTypes = {
  title: PropTypes.string,
  classname: PropTypes.string,
};

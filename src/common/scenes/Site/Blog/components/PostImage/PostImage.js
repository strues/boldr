/* @flow */
import React from 'react';

const PostImage = (props: { imageSrc: String, altText: String }) => {
  return (
    <div className="postimage__wrap">
      <img src={ props.imageSrc } alt={ props.altText } className="postimage" />
    </div>
  );
};

export default PostImage;

/* @flow */
import React from 'react';
import {Image} from 'boldr-ui';

const PostImage = (props: {imageSrc: String, altText: String}) => {
  return (
    <div className="boldr-post__image-wrap">
      <Image
        imgSrc={props.imageSrc}
        alt={props.altText}
        className="boldr-post__image"
      />
    </div>
  );
};

export default PostImage;

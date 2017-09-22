/* @flow */
import React from 'react';
import classnames from 'classnames';
import { StyleClasses } from '@boldr/ui';

const BASE_ELEMENT = StyleClasses.ARTICLE_IMAGE_WRAP;
const BASE_ELEMENT2 = StyleClasses.ARTICLE_IMAGE;
const ArticleImage = (props: {
  imageSrc: string,
  altText: string,
  className?: string,
  imgClass?: string,
}) => {
  const classes = classnames(BASE_ELEMENT, props.className);
  const classes2 = classnames(BASE_ELEMENT2, props.imgClass);
  return (
    <div className={classes}>
      <img src={props.imageSrc} alt={props.altText} className={classes2} />
    </div>
  );
};

export default ArticleImage;

/* @flow */
import React from 'react';
import classnames from 'classnames';
import { StyleClasses } from '../../theme/styleClasses';

type Props = {
  className: String,
  alt: String,
  width: String,
  imgSrc: String,
};

const BASE_ELEMENT = StyleClasses.IMAGE;

const Image = (props: Props) => {
  const classes = classnames(BASE_ELEMENT, props.className);
  return <img src={props.imgSrc} className={classes} alt={props.alt} width={props.width} />;
};

export default Image;

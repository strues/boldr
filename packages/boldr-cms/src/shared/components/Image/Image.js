/* @flow */
import React from 'react';

type Props = {
  className: String,
  alt: String,
  width: String,
  imgSrc: String,
};

const Image = (props: Props) => {
  const imgClass = props.className ? props.className : 'boldr-image';
  return (
    <img src={ props.imgSrc } className={ imgClass } alt={ props.alt } width={ props.width } />
  );
};

export default Image;

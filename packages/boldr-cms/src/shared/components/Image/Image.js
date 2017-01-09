import React from 'react';

const Image = (props) => {
  const imgClass = props.className ? props.className : 'boldr-image';
  return (
    <img src={ props.imgSrc } className={ imgClass } alt={ props.alt } width={ props.width } />
  );
};

export default Image;

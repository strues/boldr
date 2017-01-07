import React from 'react';

const Image = (props) => {
  return (
    <img src={ props.imgSrc } className="boldr-image" alt={ props.alt } width={ props.width } />
  );
};

export default Image;

/* @flow*/
import React from 'react';

const CardImage = (props: { imgSrc: String }) => {
  return (
    <div className="boldr-card__image">
      <img src={ props.imgSrc } alt="card feature" className="boldr-card__img" />
    </div>
  );
};

export default CardImage;

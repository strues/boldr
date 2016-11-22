/* @flow */
import React from 'react';
import Heading from '../Heading';

type Props = {
  children: ReactElement,
  title: String,
  footerMessage: String,
};
const CardContent = (props: Props) => {
  return (
    <div className="boldr-card__content">
      <Heading classname="boldr-card__title" size={ 3 }>
        { props.title }
      </Heading>
      { props.children }
      { props.footerMessage ? (
        <div className="boldr-card__footer-message">
          { props.footerMessage }
        </div>) : null
      }
    </div>
  );
};

export default CardContent;

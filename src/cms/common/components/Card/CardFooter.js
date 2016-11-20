/* @flow */
import React from 'react';

type Props = {
  children: ReactElement
};
const CardFooter = (props: Props) => {
  return (
    <div className="boldr-card__footer">
      { props.children }
    </div>
  );
};

export default CardFooter;

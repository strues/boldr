/* @flow */
import React from 'react';

type Props = {
  children: ReactElement
};
const Card = (props: Props) => {
  return (
    <section className="boldr-card">
      { props.children }
    </section>
  );
};

export default Card;

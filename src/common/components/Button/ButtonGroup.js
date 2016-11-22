/* @flow */
import React from 'react';

type Props = {
  children: ReactElement
};

const ButtonGroup = (props: Props) => {
  return (
    <div className="boldr-btn__group">
      { props.children }
    </div>
  );
};

export default ButtonGroup;

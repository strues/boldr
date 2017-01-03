/* @flow */
import React from 'react';

type Props = {
  onToggle: Function,
  style?: string,
  active?: boolean,
  icon?: number | string | ReactElement | Array<any>,
  label?: string,
  onToggle: () => void,
};

const StyleButton = (props: Props) => {
  const onToggle = (e) => {
    e.preventDefault();
    props.onToggle(props.style);
  };
  let className = 'be-btn';
  if (props.active) {
    className += ' be-btn__active';
  }

  return (
    <span className={ className } onMouseDown={ onToggle }>
      {
        props.icon || props.label
      }
    </span>
  );
}

export default StyleButton;

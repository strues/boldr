/* @flow */
import React from 'react';

export type Props = {
  prefixCls?: string,
  value?: any,
  text?: any,
  placeholder?: string,
  onClick: ?Function,
};

const SelectTrigger = (props: Props) => {
  const { prefixCls, onClick } = props;

  return (
    <div className={`${prefixCls}-text`} onClick={onClick}>
      {props.text || props.placeholder}
    </div>
  );
};

export default SelectTrigger;

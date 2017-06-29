/* @flow */
import React from 'react';

export type Props = {
  prefixCls?: string,
  value?: any,
  text?: any,
  placeholder?: string,
};

const SimpleTrigger = (props: Props) => {
  let { prefixCls, onClick } = props;

  return (
    <div className={`${prefixCls}-simple`} onClick={onClick}>
      {props.text || props.placeholder}
    </div>
  );
};

export default SimpleTrigger;

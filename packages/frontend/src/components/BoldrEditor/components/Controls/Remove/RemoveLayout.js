/* @flow */

import React from 'react';
import cn from 'classnames';
import Eraser from '@boldr/icons/Eraser';
import Option from '../../Option';

type Props = {
  config: Object,
  onChange: Function,
};

const RemoveLayout = ({ config, onChange }: Props) => {
  const { className, title } = config;
  return (
    <span className={cn('be-ctrl__group')} aria-label="be-remove__control">
      <Option className={className} onClick={onChange} title={title}>
        <Eraser fill="#222" />
      </Option>
    </span>
  );
};

export default RemoveLayout;

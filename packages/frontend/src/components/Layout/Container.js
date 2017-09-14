// @flow
import React from 'react';
import cn from 'classnames';

import { createWrappedComponent } from '../util/boldrui';

export type Props = {
  tag?: string,
  isFluid?: boolean,
  className?: string,
};

export function Container({ tag = 'div', ...props }: Props) {
  const className = cn(
    'boldr-container',
    {
      'is-fluid': props.isFluid,
      'is-flex': true,
    },
    props.className,
  );

  const { ...HTMLProps } = props;

  return React.createElement(tag, { ...HTMLProps, className });
}

export default createWrappedComponent(Container);

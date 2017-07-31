// @flow
import React from 'react';
import classNames from 'classnames';

import { createWrappedComponent } from '../UiHelpers/boldrui';

export type Props = {
  tag?: string,
  isFluid?: boolean,
  className?: string,
};

export function Container({ tag = 'div', ...props }: Props) {
  const className = classNames(
    'boldrui-container',
    {
      'is-fluid': props.isFluid,
      'is-flex': true,
    },
    props.className,
  );

  const { isFluid, ...HTMLProps } = props;

  return React.createElement(tag, { ...HTMLProps, className });
}

export default createWrappedComponent(Container);

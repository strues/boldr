// @flow
import React from 'react';
import classNames from 'classnames';

import { withHelpersModifiers } from '../../core/util/boldrui';

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
    },
    props.className,
  );

  const { isFluid, ...HTMLProps } = props;

  return React.createElement(tag, { ...HTMLProps, className });
}

export default withHelpersModifiers(Container);

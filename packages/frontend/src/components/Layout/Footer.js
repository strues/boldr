// @flow
import React from 'react';
import cn from 'classnames';
import { createWrappedComponent } from '../util/boldrui';

export type Props = {
  tag?: string,
  className?: string,
};

export function Footer({ tag = 'footer', ...props }: Props) {
  const className = cn('boldr-footer', props.className);

  return React.createElement(tag, { ...props, className });
}

export default createWrappedComponent(Footer);

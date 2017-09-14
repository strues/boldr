// @flow
import React from 'react';
import cn from 'classnames';
import { createWrappedComponent } from '../util/boldrui';

export type Props = {
  tag?: string,
  className?: string,
};

export function HeroBody({ tag = 'div', ...props }: Props) {
  const className = cn('boldr-hero__body', props.className);

  return React.createElement(tag, { ...props, className });
}

export default createWrappedComponent(HeroBody);

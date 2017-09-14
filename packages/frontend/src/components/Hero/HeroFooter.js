// @flow
import React from 'react';
import cn from 'classnames';
import { createWrappedComponent } from '../util/boldrui';

export type Props = {
  tag?: string,
  className?: string,
};
export function HeroFooter({ tag = 'footer', ...props }: Props) {
  const className = cn('boldr-hero__footer', props.className);

  return React.createElement(tag, { ...props, className });
}

export default createWrappedComponent(HeroFooter);

// @flow
import React from 'react';
import cn from 'classnames';
import { getSizeModifiers, removeSizeProps, createWrappedComponent } from '../util/boldrui';
import { getDomSafeProps } from '../util/helpers';

export type Props = {
  tag?: string,
  isSize?: string,
  className?: string,
};

export function Section({ tag = 'section', ...props }: Props) {
  const className = cn(
    'boldr-section',
    {
      ...getSizeModifiers(props),
    },
    props.className,
  );

  const HTMLProps = getDomSafeProps(props, removeSizeProps);

  return React.createElement(tag, { ...HTMLProps, className });
}

export default createWrappedComponent(Section);

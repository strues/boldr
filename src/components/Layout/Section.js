// @flow
import React from 'react';
import classNames from 'classnames';
import { getSizeModifiers, removeSizeProps, createWrappedComponent } from '../UiHelpers/boldrui';
import { getDomSafeProps, isOption } from '../UiHelpers/helpers';

export type Props = {
  tag?: string,
  isSize?: string,
  className?: string,
};

export function Section({ tag = 'section', ...props }: Props) {
  const className = classNames(
    'boldrui-section',
    {
      ...getSizeModifiers(props),
    },
    props.className,
  );

  const HTMLProps = getDomSafeProps(props, removeSizeProps);

  return React.createElement(tag, { ...HTMLProps, className });
}

export default createWrappedComponent(Section);

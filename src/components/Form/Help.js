// @flow
import React from 'react';
import classNames from 'classnames';

import { getColorModifiers, removeColorProps, createWrappedComponent } from '../../core/util/boldrui';
import { getDomSafeProps } from '../../core/util/helpers';
import { StyleClasses } from '../../theme/styleClasses';

const BASE_ELEMENT = StyleClasses.FORM_HELP;
export type Props = {
  tag?: string,
  className?: string,
};

export function Help({ tag = 'p', ...props }: Props) {
  const className = classNames(
    BASE_ELEMENT,
    {
      ...getColorModifiers(props),
    },
    props.className,
  );

  const HTMLProps = getDomSafeProps(props, removeColorProps);

  return React.createElement(tag, { ...HTMLProps, className });
}

export default createWrappedComponent(Help);

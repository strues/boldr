// @flow
import React from 'react';
import classNames from 'classnames';

import {
  getSizeModifiers,
  removeSizeProps,
  createWrappedComponent,
} from '../../../core/util/boldrui';
import { getDomSafeProps } from '../../../core/util/helpers';

export type Props = {
  isNormal?: boolean,
  tag?: string,
  className?: string,
};

export function FieldLabel({ tag = 'div', ...props }: Props) {
  const className = classNames(
    'boldrui-form__field-label',
    {
      'is-normal': props.isNormal,
      ...getSizeModifiers(props),
    },
    props.className,
  );

  const { isNormal, ...rest } = props;

  const HTMLProps = getDomSafeProps(rest, removeSizeProps);

  return React.createElement(tag, { ...HTMLProps, className });
}

export default createWrappedComponent(FieldLabel);

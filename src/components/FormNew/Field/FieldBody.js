// @flow
import React from 'react';
import classNames from 'classnames';

import { createWrappedComponent } from '../../../core/util/boldrui';

export type Props = {
  tag?: string,
  className?: string,
};

export function FieldBody({ tag = 'div', ...props }: Props) {
  const className = classNames('boldrui-form__field-body', props.className);

  return React.createElement(tag, { ...props, className });
}

export default createWrappedComponent(FieldBody);

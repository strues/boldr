// @flow
import React from 'react';
import classNames from 'classnames';

import { createWrappedComponent } from '../../util/boldrui';

export type Props = {
  tag?: string,
  className?: string,
};

export function FieldBody({ tag = 'div', ...props }: Props) {
  const className = classNames('boldr-form__field-body', props.className);

  return React.createElement(tag, { ...props, className });
}

export default createWrappedComponent(FieldBody);

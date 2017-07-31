// @flow
import React from 'react';
import classNames from 'classnames';

import { createWrappedComponent } from '../UiHelpers/boldrui';
import { StyleClasses } from '../../theme/styleClasses';

const BASE_ELEMENT = StyleClasses.CHECKBOX;

export type Props = {
  children: ReactChildren,
  disabled?: boolean,
  className?: string,
};

export function Checkbox(props: Props) {
  const wrapperClassName = classNames(BASE_ELEMENT, props.className);

  const { children, className, ...HTMLProps } = props;

  return (
    <label className={wrapperClassName} disabled={HTMLProps.disabled}>
      <input {...HTMLProps} type="checkbox" />
      {children}
    </label>
  );
}

export default createWrappedComponent(Checkbox);

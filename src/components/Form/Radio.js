// @flow
import React from 'react';
import classNames from 'classnames';

import { createWrappedComponent } from '../UiHelpers/boldrui';
import { combineModifiers, getDomSafeProps } from '../UiHelpers/helpers';
import { StyleClasses } from '../../theme/styleClasses';

const BASE_ELEMENT = StyleClasses.RADIO;
export type Props = {
  disabled?: boolean,
  className?: string,
  children: ReactChildren,
};
export function Radio(props: Props) {
  const wrapperClassName = classNames(BASE_ELEMENT, props.className);

  const { children, className, ...HTMLProps } = props;

  return (
    <label className={wrapperClassName} disabled={HTMLProps.disabled}>
      <input {...HTMLProps} type="radio" />
      {children}
    </label>
  );
}

export default createWrappedComponent(Radio);

// @flow
import React from 'react';
import classNames from 'classnames';

import {
  getColorModifiers,
  getSizeModifiers,
  getLoadingModifiers,
  removeColorProps,
  removeSizeProps,
  removeLoadingProps,
  createWrappedComponent,
} from '../../core/util/boldrui';
import { combineModifiers, getDomSafeProps } from '../../core/util/helpers';
import { StyleClasses } from '../../theme/styleClasses';

const BASE_ELEMENT = StyleClasses.SELECT;

export type Props = {
  disabled?: boolean,
  className?: string,
  children: ReactChildren,
};
export function Select(props: Props) {
  const wrapperClassName = classNames(
    BASE_ELEMENT,
    {
      'is-disabled': props.disabled,
      ...combineModifiers(props, getColorModifiers, getSizeModifiers, getLoadingModifiers),
    },
    props.className,
  );

  const { children, className, ...HTMLProps } = getDomSafeProps(
    props,
    removeColorProps,
    removeSizeProps,
    removeLoadingProps,
  );

  return (
    <div className={wrapperClassName}>
      <select {...HTMLProps}>
        {children}
      </select>
    </div>
  );
}

export default createWrappedComponent(Select);

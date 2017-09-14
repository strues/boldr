// @flow
import React from 'react';
import classNames from 'classnames';

import {
  getColorModifiers,
  getSizeModifiers,
  getStateModifiers,
  removeColorProps,
  removeSizeProps,
  removeStateProps,
  createWrappedComponent,
} from '../util/boldrui';
import { combineModifiers, getDomSafeProps } from '../util/helpers';

import { StyleClasses } from '../../theme/styleClasses';

const BASE_ELEMENT = StyleClasses.INPUT;

export type Props = {
  className?: string,
  type?: string,
};

export function Input(props: Props) {
  const className = classNames(
    BASE_ELEMENT,
    {
      ...combineModifiers(props, getColorModifiers, getSizeModifiers, getStateModifiers),
    },
    props.className,
  );

  const HTMLProps = getDomSafeProps(props, removeColorProps, removeSizeProps, removeStateProps);

  return <input {...HTMLProps} className={className} type={props.type || 'text'} />;
}

export default createWrappedComponent(Input);

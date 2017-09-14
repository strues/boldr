// @flow
import React from 'react';
import classNames from 'classnames';

import {
  getSizeModifiers,
  getStateModifiers,
  removeSizeProps,
  removeStateProps,
  createWrappedComponent,
} from '../util/boldrui';
import { combineModifiers, getDomSafeProps } from '../util/helpers';

import { StyleClasses } from '../../theme/styleClasses';

const BASE_ELEMENT = StyleClasses.TEXTAREA;

export type Props = {
  className?: string,
};
export function TextArea(props: Props) {
  const className = classNames(
    BASE_ELEMENT,
    {
      ...combineModifiers(props, getSizeModifiers, getStateModifiers),
    },
    props.className,
  );

  const HTMLProps = getDomSafeProps(props, removeSizeProps, removeStateProps);

  return <textarea {...HTMLProps} className={className} />;
}

export default createWrappedComponent(TextArea);

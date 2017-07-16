/* @flow */
import React from 'react';
import classNames from 'classnames';
import { StyleClasses } from '../../theme/styleClasses';
import { createWrappedComponent } from '../../core/util/boldrui';

export type Props = {
  tag?: string,
  isBoxed?: boolean,
  className?: string,
};

const BASE_ELEMENT = StyleClasses.NAVBAR_END;

export function NavbarEnd({ tag = 'div', ...props }: Props) {
  const className = classNames(BASE_ELEMENT, props.className);

  return React.createElement(tag, { ...props, className });
}

const HOC = createWrappedComponent(NavbarEnd);
export default HOC;

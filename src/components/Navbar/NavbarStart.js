/* @flow */
import React from 'react';
import classNames from 'classnames';
import { createWrappedComponent } from '../UiHelpers/boldrui';
import { StyleClasses } from '../../theme/styleClasses';

export type Props = {
  tag?: string,
  className?: string,
};

const BASE_ELEMENT = StyleClasses.NAVBAR_START;
export function NavbarStart({ tag = 'div', ...props }: Props) {
  const className = classNames(BASE_ELEMENT, props.className);

  return React.createElement(tag, { ...props, className });
}

export default createWrappedComponent(NavbarStart);

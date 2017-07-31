/* @flow */
import React from 'react';
import classNames from 'classnames';
import { StyleClasses } from '../../theme/styleClasses';
import { createWrappedComponent } from '../UiHelpers/boldrui';

export type Props = {
  tag?: string,
  isTransparent?: boolean,
  className?: string,
};

const BASE_ELEMENT = StyleClasses.NAVBAR;

export function Navbar({ tag = 'nav', isTransparent, ...props }: Props) {
  const className = classNames(
    BASE_ELEMENT,
    {
      'is-transparent': isTransparent,
    },
    props.className,
  );

  return React.createElement(tag, { ...props, className });
}

export default createWrappedComponent(Navbar);

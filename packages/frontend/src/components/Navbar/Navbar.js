/* @flow */
import React from 'react';
import classNames from 'classnames';
import { createWrappedComponent } from '../util/boldrui';

export type NavbarProps = {
  /**
   * Html tag for the navbar element.
   * default is nav.
   * @type {string}
   */
  tag?: string,
  /**
   * Is the background transparen
   * @type {boolean}
   */
  isTransparent?: boolean,
  /**
   * additional custom css class names
   * @type {string}
   */
  className?: string,
};

export function Navbar({ tag = 'nav', isTransparent, ...props }: NavbarProps) {
  const className = classNames(
    'boldr-navbar',
    {
      'is-transparent': isTransparent,
    },
    props.className,
  );

  return React.createElement(tag, { ...props, className });
}

export default createWrappedComponent(Navbar);

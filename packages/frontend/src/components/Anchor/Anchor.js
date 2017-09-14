/* @flow */
import React from 'react';
import type { Node } from 'react';
// import {NavLink} from 'react-router-dom';

import omit from 'lodash.omit';
import Icon from '../Icons/Icon';

const BLACK_LIST = ['iconSize', 'iconColor'];

const PLAIN_BLACKLIST = ['iconSize', 'iconColor'].concat(BLACK_LIST);

export type Props = {
  href: string,
  className: string,
  label: string,
  children: any,
  onClick: () => void,
  icon?: Node,
  iconColor?: string,
  iconSize?: string,
};

export default class Anchor extends React.PureComponent<Props, *> {
  props: Props;

  handleClick = (event: Event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  // render button as a link
  renderIcon() {
    const { href, label, icon, iconColor, iconSize } = this.props;
    const nodeProps = omit(this.props, PLAIN_BLACKLIST);
    return (
      <NavLink
        className="boldr-link"
        onClick={this.handleClick}
        title={label}
        to={href}
        {...nodeProps}>
        <Icon className="boldr-icon" color={iconColor} size={iconSize} kind={icon} />
        {label}
      </NavLink>
    );
  }

  // render button
  renderPlain(classNames) {
    const { href, label } = this.props;
    const nodeProps = omit(this.props, PLAIN_BLACKLIST);

    return (
      <a
        {...nodeProps}
        className="boldr-link"
        onClick={this.handleClick}
        title={label}
        href={href}
        {...this.props}>
        {label}
      </a>
    );
  }

  render() {
    const renderer = this.props.icon ? 'renderIcon' : 'renderPlain';
    const { href, className, label, onClick, icon, iconColor, iconSize } = this.props;

    return this[renderer]();
  }
}

/* @flow */
import React, { PureComponent } from 'react';
import classnames from 'classnames';
import NavLink from 'react-router-dom/NavLink';
import Icon from '@boldr/ui/Icons/Icon';
import omit from 'lodash/omit';

const BLACK_LIST = ['iconSize', 'iconColor'];

const PLAIN_BLACKLIST = ['iconSize', 'iconColor'].concat(BLACK_LIST);

export type Props = {
  href: string,
  className: string,
  label: string,
  children: any,
  onClick: () => void,
  icon: ?ReactElement,
  iconColor: ?string,
  iconSize: ?string,
};

export default class Anchor extends PureComponent {
  props: Props;

  handleClick = event => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  // render button as a link
  renderIcon(classNames) {
    const { href, label, icon, iconColor, iconSize } = this.props;
    const nodeProps = omit(this.props, PLAIN_BLACKLIST);
    return (
      <NavLink
        className="boldrui-link"
        onClick={this.handleClick}
        title={label}
        to={href}
        {...nodeProps}
      >
        <Icon className="boldrui-icon" color={iconColor} size={iconSize} kind={icon} />
        {label}
      </NavLink>
    );
  }

  // render button
  renderPlain(classNames) {
    const { href, label } = this.props;
    const nodeProps = omit(this.props, PLAIN_BLACKLIST);

    return (
      <NavLink
        {...nodeProps}
        className="boldrui-link"
        onClick={this.handleClick}
        title={label}
        to={href}
        {...this.props}
      >
        {label}
      </NavLink>
    );
  }

  render() {
    const renderer = this.props.icon ? 'renderIcon' : 'renderPlain';
    const { href, className, label, onClick, icon, iconColor, iconSize } = this.props;

    return this[renderer]();
  }
}

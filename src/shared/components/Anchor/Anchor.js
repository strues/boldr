/* @flow */
import React, { Component } from 'react';
import classnames from 'classnames';
import NavLink from 'react-router-dom/NavLink';
import Icon from '@boldr/ui/Icons/Icon';

type Props = {
  href: string,
  className: string,
  label: string,
  children: any,
  onClick: () => void,
  icon: ?ReactElement,
  iconColor: ?string,
  iconSize: ?string,
};

const Anchor = (props: Props) => {
  const { href, className, label, onClick, icon, iconColor, iconSize } = props;
  return (
    <NavLink to={href} className="boldrui-link" onClick={onClick} title={label} {...props}>
      {props.icon
        ? <Icon className="boldrui-icon" color={iconColor} size={iconSize} kind={props.icon} />
        : null}
      {label}
    </NavLink>
  );
};

export default Anchor;

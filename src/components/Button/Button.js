/* @flow */
import React, { Component } from 'react';
import cxN from 'classnames';
import omit from 'lodash/omit';

const BLACK_LIST = [
  'type',
  'size',
  'htmlType',
  'block',
  'component',
  'disabled',
  'loading',
  'outline',
  'bordered',
  'className',
  'prefix',
];

const BTN_BLACKLIST = ['href', 'target'].concat(BLACK_LIST);

const LINK_BLACKLIST = ['href', 'target'].concat(BLACK_LIST);

export type ButtonProps = {
  kind?: 'default' | 'primary' | 'secondary' | 'danger' | 'link',
  size?: 'large' | 'medium' | 'small',
  htmlType?: 'button' | 'submit' | 'reset',
  className?: string,
  block?: boolean,
  component?: string | Function,
  disabled?: boolean,
  loading?: boolean,
  outline?: boolean,
  bordered?: boolean,
  prefix?: string,
  onClick: ?Function,
  children: ?ReactChildren,
  href: ?string,
  target: ?string,
};

export default class Button extends Component {
  static defaultProps = {
    kind: 'default',
    size: 'medium',
    htmlType: 'button',
    className: '',
    block: false,
    disabled: false,
    loading: false,
    outline: false,
    bordered: true,
    prefix: 'boldrui',
  };

  props: ButtonProps;

  handleClick = event => {
    if (this.props.disabled || this.props.loading) {
      return;
    }

    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  // render button as a link
  renderLink(classNames) {
    const Element = this.props.component || 'a';
    const disabled = this.props.disabled || this.props.loading;
    const { href = '', target } = this.props;
    const nodeProps = omit(this.props, LINK_BLACKLIST);

    return (
      <Element
        {...(disabled ? {} : { href, target })}
        {...nodeProps}
        className={classNames}
        onClick={this.handleClick}
      >
        {this.props.children}
      </Element>
    );
  }

  // render button
  renderButton(classNames) {
    const Element = this.props.component || 'button';
    const disabled = this.props.disabled || this.props.loading;
    const { htmlType } = this.props;
    const nodeProps = omit(this.props, BTN_BLACKLIST);

    return (
      <Element
        {...nodeProps}
        {...(htmlType ? { type: htmlType } : {})}
        className={classNames}
        disabled={disabled}
        onClick={this.handleClick}
      >
        {this.props.children}
      </Element>
    );
  }

  render() {
    const renderer = this.props.href || this.props.target ? 'renderLink' : 'renderButton';
    const {
      className,
      kind,
      size,
      block,
      disabled,
      loading,
      outline,
      bordered,
      prefix,
    } = this.props;
    const classNames = cxN(
      `${prefix}-btn`,
      {
        [`${prefix}-btn__${kind}${outline ? '-outline' : ''}`]: kind !== 'default',
        [`${prefix}-btn__${size}`]: size !== 'medium',
        [`${prefix}-btn__block`]: block,
        [`${prefix}-btn__loading`]: loading,
        [`${prefix}-btn__disabled`]: disabled,
        [`${prefix}-btn__border-transparent`]: !bordered,
      },
      className,
    );

    return this[renderer](classNames);
  }
}

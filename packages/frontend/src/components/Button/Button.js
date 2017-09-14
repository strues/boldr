import React from 'react';
import cn from 'classnames';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import { StyleClasses } from '../../theme/styleClasses';
import TouchRipple from '../util/TouchRipple';

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
];

const BTN_BLACKLIST = ['href', 'target'].concat(BLACK_LIST);
const BASE_ELEMENT = StyleClasses.BUTTON;
const LINK_BLACKLIST = ['href', 'target'].concat(BLACK_LIST);

export default class Button extends React.Component {
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
    prefix: 'boldr',
  };
  static propTypes = {
    kind: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'danger', 'link']),
    size: PropTypes.oneOf(['large', 'medium', 'small']),
    htmlType: PropTypes.oneOf(['button', 'submit', 'reset']),
    className: PropTypes.string,
    block: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    outline: PropTypes.bool,
    bordered: PropTypes.bool,
    target: PropTypes.string,
    href: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
  };

  handleClick = event => {
    if (this.props.disabled || this.props.loading) {
      return;
    }

    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  startRipple = e => {
    this.refs.touchRipple.addRipple(e);
  };

  endRipple = () => {
    this.refs.touchRipple.removeRipple();
  };
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
        onClick={this.handleClick}>
        {this.props.children}
        <TouchRipple ref="touchRipple" className="btn-ripple" />
      </Element>
    );
  }
  // render button as a link
  renderLink(classNames) {
    const disabled = this.props.disabled || this.props.loading;
    const { href = '', target } = this.props;
    const nodeProps = omit(this.props, LINK_BLACKLIST);

    return (
      <Link
        {...(disabled ? {} : { to: href, target })}
        {...nodeProps}
        className={classNames}
        onClick={this.handleClick}>
        {this.props.children}
      </Link>
    );
  }
  render() {
    const renderer = this.props.href || this.props.target ? 'renderLink' : 'renderButton';
    const { className, kind, size, block, disabled, loading, outline, bordered } = this.props;

    const classNames = cn(
      BASE_ELEMENT,
      {
        [`${BASE_ELEMENT}__${kind}${outline ? '--outline' : ''}`]: kind !== 'default',
        [`${BASE_ELEMENT}__${size}`]: size !== 'medium',
        [`${BASE_ELEMENT}--block`]: block,
        [`${BASE_ELEMENT}--loading`]: loading,
        [`${BASE_ELEMENT}--disabled`]: disabled,
        [`${BASE_ELEMENT}--transparent`]: !bordered,
      },
      className,
    );

    return this[renderer](classNames);
  }
}

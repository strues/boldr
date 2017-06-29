/* @flow */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

type Props = {
  src?: string,
  alt?: string,
  icon?: ReactNode,
  children?: ReactChildren,
  random?: boolean,
  suffixes?: Array<string>,
  suffix?: string,
  iconSized?: boolean,
  className: ?string,
  role?: string,
};
/**
 * The avatar component is used to convert a `FontIcon`, an image, or
 * a letter into an avatar.
 *
 * Any other props given to the Avatar component such as event listeners
 * or styles will also be applied.
 */
export default class Avatar extends PureComponent {
  static defaultProps = {
    suffixes: [
      'red',
      'pink',
      'purple',
      'deep-purple',
      'indigo',
      'blue',
      'light-blue',
      'cyan',
      'teal',
      'green',
      'light-green',
      'lime',
      'yellow',
      'amber',
      'orange',
      'deep-orange',
      'brown',
      'grey',
      'blue-grey',
    ],
  };

  state = { color: null };

  componentWillMount() {
    if (this.props.random) {
      this._setRandomColor();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.random &&
      (this.props.src !== nextProps.src || this.props.icon !== nextProps.icon)
    ) {
      this._setRandomColor();
    } else if (this.props.random && !nextProps.random) {
      this.setState({ color: null });
    }
  }
  props: Props;
  _setRandomColor = () => {
    const { suffixes } = this.props;

    const i = Math.floor(Math.random() * (suffixes.length - 1)) + 1;
    this.setState({ color: suffixes[i] });
  };

  _getColor(suffix, suffixes, color) {
    if (suffix) {
      return `boldrui-avatar--${suffix}`;
    } else if (!!suffixes && !color) {
      return 'boldrui-avatar--default';
    }

    return `boldrui-avatar--${color}`;
  }

  render() {
    const {
      className,
      src,
      alt,
      icon,
      children,
      suffix,
      suffixes,
      iconSized,
      role,
      random, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

    return (
      <div
        {...props}
        className={cn(
          'boldrui-inline-block boldrui-avatar',
          this._getColor(suffix, suffixes, this.state.color),
          {
            'boldrui-avatar__icon-sized': iconSized,
          },
          className,
        )}
      >
        {src && <img src={src} alt={alt} role={role} className="boldrui-avatar__img" />}
        {!src &&
          <div className="boldrui-avatar__content">
            {icon || children}
          </div>}
      </div>
    );
  }
}

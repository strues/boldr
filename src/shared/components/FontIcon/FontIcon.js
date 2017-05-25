/* @flow */
import React, { PureComponent } from 'react';
import cn from 'classnames';
import type { ReactChildren } from '../../types/react.js.flow';

const styles = {
  sized: { width: 24, height: 24 },
  fullySized: { width: 24, height: 24, fontSize: 24 },
};

type Props = {
  iconClassName?: string,
  disabled?: boolean,
  forceSize?: boolean | number,
  forceFontSize?: boolean,
  className?: string,
  children: ReactChildren,
  style?: Object,
};

export default class FontIcon extends PureComponent {
  static defaultProps = {
    iconClassName: 'material-icons',
  };
  props: Props;
  render() {
    const {
      iconClassName,
      className,
      children,
      disabled,
      style,
      forceSize,
      forceFontSize,
      ...props
    } = this.props;

    let mergedStyles = style;
    if (typeof forceSize === 'boolean') {
      const merge = forceFontSize ? styles.fullySized : styles.sized;
      mergedStyles = style ? { ...merge, ...style } : merge;
    } else if (typeof forceSize === 'number') {
      const merge = {
        fontSize: forceFontSize ? forceSize : undefined,
        height: forceSize,
        width: forceSize,
      };

      mergedStyles = style ? { ...merge, ...style } : merge;
    }

    return (
      <i
        {...props}
        style={mergedStyles}
        className={cn(
          'md-icon',
          iconClassName,
          {
            'md-icon--disabled': disabled,
          },
          className,
        )}
      >
        {children}
      </i>
    );
  }
}

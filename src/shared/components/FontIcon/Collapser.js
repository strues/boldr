/* @flow */
import React, { PureComponent } from 'react';
import cn from 'classnames';
import type { ReactChildren } from '../../types/react.js.flow';
import FontIcon from './FontIcon';

type Props = {
  iconClassName?: string,
  flipped?: boolean,
  className?: string,
  children: ReactChildren,
  suffix: string,
  suffixFlipped?: boolean,
};

export default class Collapser extends PureComponent {
  static defaultProps = {
    children: 'keyboard_arrow_down',
  };

  state = {};
  props: Props;
  render() {
    const { className, flipped, suffix, suffixFlipped, ...props } = this.props;
    return (
      <FontIcon
        key="collapser"
        {...props}
        className={cn(
          'md-collapser',
          {
            'md-collapser--flipped': flipped && (!suffixFlipped || !suffix),
            [`md-collapser--${suffix}`]: suffix,
            [`md-collapser--${suffix}-flipped`]: suffix &&
              flipped &&
              suffixFlipped,
          },
          className,
        )}
      />
    );
  }
}

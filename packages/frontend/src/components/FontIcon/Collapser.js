/* @flow */
import React from 'react';
import type { Node } from 'react';
import cn from 'classnames';
import FontIcon from './FontIcon';

type Props = {
  iconClassName?: string,
  flipped?: boolean,
  className?: string,
  children: Array<Node>,
  suffix: string,
  suffixFlipped?: boolean,
};

export default class Collapser extends React.PureComponent<Props, *> {
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
            [`md-collapser--${suffix}-flipped`]: suffix && flipped && suffixFlipped,
          },
          className,
        )}
      />
    );
  }
}

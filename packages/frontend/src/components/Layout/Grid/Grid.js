/* @flow */
import React from 'react';
import type { Node } from 'react';
import cn from 'classnames';

export type GridProps = {
  fluid: boolean,
  className?: string,
  style?: Object,
  children: Array<Node>,
  componentClass: string,
};

class Grid extends React.PureComponent<GridProps, void> {
  static defaultProps = {
    fluid: false,
    componentClass: 'div',
  };

  render(): Node {
    const ComponentClass = this.props.componentClass;

    const classes = cn(
      {
        grid: !this.props.fluid,
        'grid--fluid': this.props.fluid,
      },
      this.props.className,
    );

    return (
      <ComponentClass className={classes} style={this.props.style}>
        {this.props.children}
      </ComponentClass>
    );
  }
}

export default Grid;

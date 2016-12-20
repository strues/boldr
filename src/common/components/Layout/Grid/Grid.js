import React, { PureComponent } from 'react';
import classNames from 'classnames';

export type Props = {
  fluid?: boolean,
  className?: string,
  style?: Object,
  children?: number | string | React.Element | Array<any>,
};

class Grid extends PureComponent {
  props: Props;
  render() {
    const ComponentClass = this.props.componentClass;

    const classes = classNames({ grid: !this.props.fluid,
      'grid--fluid': this.props.fluid,
    }, this.props.className);

    return (
      <ComponentClass className={ classes } style={ this.props.style }>
        { this.props.children }
      </ComponentClass>
    );
  }
}

Grid.defaultProps = {
  componentClass: 'div',
};

export default Grid;

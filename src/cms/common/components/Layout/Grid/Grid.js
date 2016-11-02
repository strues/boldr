import React, { PureComponent } from 'react';
import classNames from 'classnames';

class Grid extends PureComponent {
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

Grid.propTypes = {
  fluid: React.PropTypes.bool,
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  children: React.PropTypes.node
};

Grid.defaultProps = {
  componentClass: 'div',
};

export default Grid;

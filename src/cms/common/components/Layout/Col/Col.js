import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { isNumber } from 'lodash';

class Col extends PureComponent {
  render() {
    const ComponentClass = this.props.componentClass;

    const classes = classNames({
      ['grid__col--xs' + (isNumber(this.props.xs) ? '-' + this.props.xs : '')]: this.props.xs >= 0,
      ['grid__col--sm' + (isNumber(this.props.sm) ? '-' + this.props.sm : '')]: this.props.sm >= 0,
      ['grid__col--md' + (isNumber(this.props.md) ? '-' + this.props.md : '')]: this.props.md >= 0,
      ['grid__col--lg' + (isNumber(this.props.lg) ? '-' + this.props.lg : '')]: this.props.lg >= 0,

      ['grid__col--xs-offset-' + this.props.xsOffset]: this.props.xsOffset >= 0,
      ['grid__col--sm-offset-' + this.props.smOffset]: this.props.smOffset >= 0,
      ['grid__col--md-offset-' + this.props.mdOffset]: this.props.mdOffset >= 0,
      ['grid__col--lg-offset-' + this.props.lgOffset]: this.props.lgOffset >= 0,

      'grid__col--reverse': this.props.reverse,

      'grid__col--xs-first': this.props.xsFirst,
      'grid__col--sm-first': this.props.smFirst,
      'grid__col--md-first': this.props.mdFirst,
      'grid__col--lg-first': this.props.lgFirst,

      'grid__col--xs-last': this.props.xsLast,
      'grid__col--sm-last': this.props.smLast,
      'grid__col--md-last': this.props.mdLast,
      'grid__col--lg-last': this.props.lgLast,
    }, this.props.className);

    return (
      <ComponentClass className={ classes } style={ this.props.style }>
        { this.props.children }
      </ComponentClass>
      );
  }
}

Col.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  children: React.PropTypes.node,

  xs: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.bool,
  ]),
  sm: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.bool,
  ]),
  md: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.bool,
  ]),
  lg: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.bool,
  ]),

  xsOffset: React.PropTypes.number,
  smOffset: React.PropTypes.number,
  mdOffset: React.PropTypes.number,
  lgOffset: React.PropTypes.number,

  reverse: React.PropTypes.bool,

  xsFirst: React.PropTypes.bool,
  smFirst: React.PropTypes.bool,
  mdFirst: React.PropTypes.bool,
  lgFirst: React.PropTypes.bool,

  xsLast: React.PropTypes.bool,
  smLast: React.PropTypes.bool,
  mdLast: React.PropTypes.bool,
  lgLast: React.PropTypes.bool,
};

Col.defaultProps = {
  componentClass: 'div',
};

export default Col;

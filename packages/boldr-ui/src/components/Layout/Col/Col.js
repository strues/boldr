import React, { PureComponent } from 'react';
import classNames from 'classnames';
import isNumber from 'lodash/isNumber';

export type Props = {
  className?: string,
  style?: Object,
  children?: number | string | React.Element | Array<any>,
  xs?: number | boolean,
  sm?: number | boolean,
  md?: number | boolean,
  lg?: number | boolean,
  xsOffset?: number,
  smOffset?: number,
  mdOffset?: number,
  lgOffset?: number,
  reverse?: boolean,
  xsFirst?: boolean,
  smFirst?: boolean,
  mdFirst?: boolean,
  lgFirst?: boolean,
  xsLast?: boolean,
  smLast?: boolean,
  mdLast?: boolean,
  lgLast?: boolean,
};

class Col extends PureComponent {
  props: Props;
  render() {
    const ComponentClass = this.props.componentClass;

    const classes = classNames(
      {
        [`grid__col--xs${isNumber(this.props.xs) ? `-${this.props.xs}` : ''}`]: this.props.xs >= 0,
        [`grid__col--sm${isNumber(this.props.sm) ? `-${this.props.sm}` : ''}`]: this.props.sm >= 0,
        [`grid__col--md${isNumber(this.props.md) ? `-${this.props.md}` : ''}`]: this.props.md >= 0,
        [`grid__col--lg${isNumber(this.props.lg) ? `-${this.props.lg}` : ''}`]: this.props.lg >= 0,

        [`grid__col--xs-offset-${this.props.xsOffset}`]: this.props.xsOffset >= 0,
        [`grid__col--sm-offset-${this.props.smOffset}`]: this.props.smOffset >= 0,
        [`grid__col--md-offset-${this.props.mdOffset}`]: this.props.mdOffset >= 0,
        [`grid__col--lg-offset-${this.props.lgOffset}`]: this.props.lgOffset >= 0,

        'grid__col--reverse': this.props.reverse,

        'grid__col--xs-first': this.props.xsFirst,
        'grid__col--sm-first': this.props.smFirst,
        'grid__col--md-first': this.props.mdFirst,
        'grid__col--lg-first': this.props.lgFirst,

        'grid__col--xs-last': this.props.xsLast,
        'grid__col--sm-last': this.props.smLast,
        'grid__col--md-last': this.props.mdLast,
        'grid__col--lg-last': this.props.lgLast,
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

Col.defaultProps = {
  componentClass: 'div',
};

export default Col;

import React, { PureComponent } from 'react';
import classNames from 'classnames';

export type Props = {
  reverse?: boolean,
  className?: string,
  style?: Object,
  children?: number | string | React.Element | Array<any>,
  xsStart?: boolean,
  smStart?: boolean,
  mdStart?: boolean,
  lgStart?: boolean,
  xsCenter?: boolean,
  smCenter?: boolean,
  mdCenter?: boolean,
  lgCenter?: boolean,
  xsEnd?: boolean,
  smEnd?: boolean,
  mdEnd?: boolean,
  lgEnd?: boolean,
  xsTop?: boolean,
  smTop?: boolean,
  mdTop?: boolean,
  lgTop?: boolean,
  xsMiddle?: boolean,
  smMiddle?: boolean,
  mdMiddle?: boolean,
  lgMiddle?: boolean,
  xsBottom?: boolean,
  smBottom?: boolean,
  mdBottom?: boolean,
  lgBottom?: boolean,
  xsAround?: boolean,
  smAround?: boolean,
  mdAround?: boolean,
  lgAround?: boolean,
  xsBetween?: boolean,
  smBetween?: boolean,
  mdBetween?: boolean,
  lgBetween?: boolean,
};

class Row extends PureComponent {
  props: Props;
  render() {
    const ComponentClass = this.props.componentClass;

    const classes = classNames({
      grid__row: true,
      'grid__row--reverse': this.props.reverse,

      'grid__row--xs-start': this.props.xsStart,
      'grid__row--sm-start': this.props.smStart,
      'grid__row--md-start': this.props.mdStart,
      'grid__row--lg-start': this.props.lgStart,

      'grid__row--xs-center': this.props.xsCenter,
      'grid__row--sm-center': this.props.smCenter,
      'grid__row--md-center': this.props.mdCenter,
      'grid__row--lg-center': this.props.lgCenter,

      'grid__row--xs-end': this.props.xsEnd,
      'grid__row--sm-end': this.props.smEnd,
      'grid__row--md-end': this.props.mdEnd,
      'grid__row--lg-end': this.props.lgEnd,

      'grid__row--xs-top': this.props.xsTop,
      'grid__row--sm-top': this.props.smTop,
      'grid__row--md-top': this.props.mdTop,
      'grid__row--lg-top': this.props.lgTop,

      'grid__row--xs-middle': this.props.xsMiddle,
      'grid__row--sm-middle': this.props.smMiddle,
      'grid__row--md-middle': this.props.mdMiddle,
      'grid__row--lg-middle': this.props.lgMiddle,

      'grid__row--xs-bottom': this.props.xsBottom,
      'grid__row--sm-bottom': this.props.smBottom,
      'grid__row--md-bottom': this.props.mdBottom,
      'grid__row--lg-bottom': this.props.lgBottom,

      'grid__row--xs-around': this.props.xsAround,
      'grid__row--sm-around': this.props.smAround,
      'grid__row--md-around': this.props.mdAround,
      'grid__row--lg-around': this.props.lgAround,

      'grid__row--xs-between': this.props.xsBetween,
      'grid__row--sm-between': this.props.smBetween,
      'grid__row--md-between': this.props.mdBetween,
      'grid__row--lg-between': this.props.lgBetween,
    }, this.props.className);

    return (
      <ComponentClass className={ classes } style={ this.props.style }>
        { this.props.children }
      </ComponentClass>
    );
  }
}

Row.defaultProps = {
  componentClass: 'div',
};

export default Row;

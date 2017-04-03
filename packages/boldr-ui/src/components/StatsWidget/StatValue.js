/* @flow */
import React from 'react';
import classnames from 'classnames';
import { StyleClasses } from '../../theme/styleClasses';

type Props = {
  // custom css classname
  className: ?string,
  // the value of the statistic
  total: number,
  // the html tag to be used
  tag: string,
};

const BASE_ELEMENT = StyleClasses.STATS_VALUE;
const defaultProps = {
  tag: 'span',
};
const StatValue = (props: Props) => {
  const {
    total,
    className,
    tag: Tag,
    ...attributes
  } = props;

  const classes = classnames(BASE_ELEMENT, className);
  return <Tag {...attributes} className={classes}>{total}</Tag>;
};

StatValue.defaultProps = defaultProps;

export default StatValue;

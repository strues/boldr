/* @flow */
import React from 'react';
import classnames from 'classnames';

import { StyleClasses } from '../../theme/styleClasses';

type Props = {
  // custom css classname
  className: ?string,
  // the name of the or key of the statistic
  name: string,
  // the html tag to be used
  tag: string,
};

const BASE_ELEMENT = StyleClasses.STATS_LABEL;
const defaultProps = {
  tag: 'span',
};
const StatLabel = (props: Props) => {
  const { name, className, tag: Tag, ...attributes } = props;

  const classes = classnames(BASE_ELEMENT, className);

  return <Tag {...attributes} className={classes}>{name}</Tag>;
};

StatLabel.defaultProps = defaultProps;

export default StatLabel;

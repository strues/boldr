/* @flow */
import React from 'react';
import { format } from 'date-fns';
import classnames from 'classnames';
import { Icon, StyleClasses } from '@boldr/ui';

export type Props = {
  created: Date,
  className?: string,
};
const BASE_ELEMENT = StyleClasses.ARTICLE_DATE;

const ArticleDate = (props: Props) => {
  const classes = classnames(BASE_ELEMENT, props.className);
  return (
    <div className={classes}>
      <Icon kind="calendar" color="#222" /> {format(props.created, 'MM/DD/YYYY')}
    </div>
  );
};

export default ArticleDate;

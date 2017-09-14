/* @flow */
import React from 'react';
import cn from 'classnames';
import { StyleClasses } from '../../theme/styleClasses';
import BreadcrumbItem from './BreadcrumbItem';

export type Props = {
  className?: string,
};

const BASE_ELEMENT = StyleClasses.BREADCRUMB;

const Breadcrumb = (props: Props) => {
  const { className, ...rest } = props;
  const classes = cn(BASE_ELEMENT, className);
  return <ol {...rest} role="navigation" aria-label="breadcrumbs" className={classes} />;
};

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;

/* @flow */
import React, { Component } from 'react';
import cx from 'classnames';
import { StyleClasses } from '../../theme/styleClasses';
import BreadcrumbItem from './BreadcrumbItem';

export type Props = {
  className?: string,
};

const BASE_ELEMENT = StyleClasses.BREADCRUMB;

class Breadcrumb extends Component {
  props: Props;
  render() {
    const { className, ...props } = this.props;
    const classes = cx(BASE_ELEMENT, className);
    return <ol {...props} role="navigation" aria-label="breadcrumbs" className={classes} />;
  }
}

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;

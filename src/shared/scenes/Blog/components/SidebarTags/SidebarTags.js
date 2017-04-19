/* @flow */
import React from 'react';
import classnames from 'classnames';
import { Heading, StyleClasses } from 'boldr-ui';
import TagBlock from '../TagBlock';

type Props = {
  className: string,
  tags: Array<Tag>,
};

const BASE_ELEMENT = StyleClasses.POST_SIDEBAR_TAGS;

const SidebarTags = (props: Props) => {
  const classes = classnames(BASE_ELEMENT, props.className);
  return (
    <div className={classes}>
      <Heading size={3}>Related Tags</Heading>
      <TagBlock tags={props.tags} />
    </div>
  );
};

export default SidebarTags;

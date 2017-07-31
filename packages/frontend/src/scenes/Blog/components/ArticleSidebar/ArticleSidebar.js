/* @flow */
import React from 'react';
import classnames from 'classnames';
import { StyleClasses } from '@boldr/ui';

import Author from '../Author';
import SidebarTags from '../SidebarTags';

export type Props = {
  className: ?string,
  authorClassName: ?string,
  tagsClassName: ?string,
  tags: Array<Tag>,
  author: Object,
};

const BASE_ELEMENT = StyleClasses.ARTICLE_SIDEBAR;

export const ArticleSidebar = (props: Props) => {
  const { author } = props;

  const classes = classnames(BASE_ELEMENT, props.className);
  return (
    <aside className={classes}>
      <Author className={props.authorClassName} author={author} />
      <SidebarTags tags={props.tags} className={props.tagsClassName} />
    </aside>
  );
};

export default ArticleSidebar;

/* @flow */
import React from 'react';
import classnames from 'classnames';
import { Headline, Col, StyleClasses, Paper } from 'boldr-ui';

import Author from '../Author';
import SidebarTags from '../SidebarTags';

type Props = {
  className: ?string,
  authorClassName: ?string,
  tagsClassName: ?string,
  articleTags: Array<Tag>,
  articleAuthor: User,
};
const BASE_ELEMENT = StyleClasses.POST_SIDEBAR;
const ArticleSidebar = (props: Props) => {
  const classes = classnames(BASE_ELEMENT, props.className);
  return (
    <aside className={classes}>
      {/* <Author className={props.authorClassName} {...props.articleAuthor} /> */}
      <SidebarTags tags={props.articleTags} className={props.tagsClassName} />
    </aside>
  );
};

export default ArticleSidebar;

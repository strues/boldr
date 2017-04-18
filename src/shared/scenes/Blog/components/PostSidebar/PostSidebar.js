/* @flow */
import React from 'react';
import classnames from 'classnames';
import {Heading, Col, StyleClasses, Paper} from 'boldr-ui';

import Author from '../Author';
import SidebarTags from '../SidebarTags';

type Props = {
  className: ?string,
  authorClassName: ?string,
  tagsClassName: ?string,
  postTags: Array<Tag>,
  postAuthor: User,
};
const BASE_ELEMENT = StyleClasses.POST_SIDEBAR;
const PostSidebar = (props: Props) => {
  const classes = classnames(BASE_ELEMENT, props.className);
  return (
    <aside className={classes}>
      <Author className={props.authorClassName} {...props.postAuthor} />
      <SidebarTags tags={props.postTags} className={props.tagsClassName} />
    </aside>
  );
};

export default PostSidebar;

/* @flow */
import React from 'react';
import classnames from 'classnames';
import Paper from 'react-md/lib/Papers';
import { Heading, Col } from '../../../../components/index';
import type { User, Tag } from '../../../../types/models';
import Author from '../Author';
import SidebarTags from '../SidebarTags';
import { StyleClasses } from '../../../../theme/theme';

type Props = {
  className: ?string,
  authorClassName: ?string,
  tagsClassName: ?string,
  tags: Array<Tag>,
  author: User,
};
const BASE_ELEMENT = StyleClasses.POST_SIDEBAR;
const PostSidebar = (props: Props) => {
  const classes = classnames(
    BASE_ELEMENT,
    props.className,
  );
  return (
    <aside className={ classes }>
      <Author className={ props.authorClassName } { ...props.author } />
      <SidebarTags tags={ props.tags } className={ props.tagsClassName } />
    </aside>
  );
};

export default PostSidebar;

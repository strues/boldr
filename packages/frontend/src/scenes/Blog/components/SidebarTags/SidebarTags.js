/* @flow */
import React from 'react';
import classnames from 'classnames';
import Heading from '@boldr/ui/Heading';
import { StyleClasses } from '@boldr/ui/theme/styleClasses';
import type { TagsType } from '../../../../types/boldr';
import TagBlock from '../TagBlock';

type Props = {
  className: string,
  tags: TagsType,
};
// boldrui-article-sidebar__tags
const BASE_ELEMENT = StyleClasses.ARTICLE_SIDEBAR_TAGS;

const SidebarTags = (props: Props) => {
  const classes = classnames(BASE_ELEMENT, props.className);
  return (
    <div className={classes}>
      <Heading type="h3">Related Tags</Heading>
      <TagBlock tags={props.tags} />
    </div>
  );
};

export default SidebarTags;

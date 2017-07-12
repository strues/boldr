/* @flow */
import React from 'react';
import classnames from 'classnames';
import Headline from '@boldr/ui/Headline';
import { StyleClasses } from '../../../../theme/styleClasses';
import TagBlock from '../TagBlock';

type Props = {
  className: string,
  tags: Array<Tag>,
};
// boldrui-article-sidebar__tags
const BASE_ELEMENT = StyleClasses.ARTICLE_SIDEBAR_TAGS;

const SidebarTags = (props: Props) => {
  const classes = classnames(BASE_ELEMENT, props.className);
  return (
    <div className={classes}>
      <Headline type="h3">Related Tags</Headline>
      <TagBlock tags={props.tags} />
    </div>
  );
};

export default SidebarTags;

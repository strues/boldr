/* @flow */
import React from 'react';
import classnames from 'classnames';
import { Heading } from '../../../../components/index';
import type { Tag } from '../../../../types/models';
import TagBlock from '../TagBlock';

import { StyleClasses } from '../../../../theme/theme';

type Props = {
  className: string,
  tags: Array<Tag>,
};

const BASE_ELEMENT = StyleClasses.POST_SIDEBAR_TAGS;

const SidebarTags = (props: Props) => {
  const classes = classnames(
    BASE_ELEMENT,
    props.className,
  );
  return (
      <div className={ classes }>
        <Heading size={ 3 }>Related Tags</Heading>
        <TagBlock tags={ props.tags } />
      </div>
  );
};

export default SidebarTags;

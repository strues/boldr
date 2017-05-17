/* @flow */
import React from 'react';
import classnames from 'classnames';
import { StyleClasses } from 'boldr-ui';
import Tag from '../Tag';

const BASE_ELEMENT = StyleClasses.TAG_BLOCK;

type Props = {
  className: ?string,
  tags: Array<Tag>,
};

const TagBlock = (props: Props) => {
  if (!props.tags) {
    return null;
  }

  const classes = classnames(BASE_ELEMENT, props.className);
  return (
    <div className={classes}>
      {props.tags.map(tag => <Tag key={tag.id} tag={tag} />)}
    </div>
  );
};

export default TagBlock;

/* @flow */
import React from 'react';
import classnames from 'classnames';
import Link from 'react-router-dom/Link';
import Tag from '@boldr/ui/Tag';
import Icon from '@boldr/ui/Icons/Icon';
import { StyleClasses } from '../../../../theme/styleClasses';

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
      {props.tags.map(tag => {
        return (
          <Link key={tag.id} to={`/blog/tags/${tag.name}`}>
            <Tag id={tag.id} removable={false} thumb={<Icon kind="tag" color="#222" size="14" />}>
              {tag.name}
            </Tag>
          </Link>
        );
      })}
    </div>
  );
};

export default TagBlock;

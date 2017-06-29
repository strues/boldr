/* @flow */

import React from 'react';
import Link from 'react-router-dom/Link';
import { gql, graphql } from 'react-apollo';
import Icon from '@boldr/ui/Icons/Icon';

type Props = {
  tags: Array<Tag>,
  handleTagClick: Function,
  handleDeleteTagClick: Function,
};

const TagList = (props: Props) => {
  function handleClickDelete(tag) {
    const tagId = tag.id;

    props.handleDeleteTagClick(tagId);
  }
  return (
    <div>
      {props.tags.map(tag =>
        <Link key={tag.id} to={`/admin/content/tags/${tag.name}`}>
          <li>
            <Icon kind="trash" color="#222" size="24" onClick={() => handleClickDelete(tag)} />
            <span>
              {tag.name}
            </span>
            <span>
              {tag.description}
            </span>
          </li>
        </Link>,
      )}
    </div>
  );
};

export default TagList;

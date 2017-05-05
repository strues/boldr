/* @flow */

import React from 'react';
import Link from 'react-router-dom/Link';
import { ListItem, Paper, Avatar, FontIcon } from 'boldr-ui';

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
      {props.tags.map(tag => (
        <Link key={tag.id} to={`/admin/tags/${tag.name}`}>
          <ListItem
            primaryText={tag.name}
            rightIcon={
              <FontIcon onClick={() => handleClickDelete(tag)}>
                delete_forever
              </FontIcon>
            }
            secondaryText={tag.description}
          />
        </Link>
      ))}
    </div>
  );
};

export default TagList;

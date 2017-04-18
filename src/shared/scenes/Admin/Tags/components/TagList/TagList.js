/* @flow */

import React from 'react';
import {ListItem, Paper, Avatar, FontIcon} from 'boldr-ui';

type Props = {
  tags: Array<Tag>,
  handleTagClick: Function,
  handleDeleteTagClick: Function,
};

const TagList = (props: Props) => {
  function handleClick(tag: Object) {
    props.handleTagClick(tag);
  }
  function handleClickDelete(tag) {
    const tagId = tag.id;

    props.handleDeleteTagClick(tagId);
  }
  return (
    <div>
      {props.tags.map(tag => (
        <ListItem
          key={tag.id}
          primaryText={tag.name}
          rightIcon={
            <FontIcon onClick={() => handleClickDelete(tag)}>
              delete_forever
            </FontIcon>
          }
          secondaryText={tag.description}
          onClick={() => handleClick(tag)}
        />
      ))}
    </div>
  );
};

export default TagList;

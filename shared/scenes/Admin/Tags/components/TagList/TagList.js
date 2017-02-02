/* @flow */

import React, { PropTypes } from 'react';
import ListItem from 'react-md/lib/Lists/ListItem';
import Paper from 'react-md/lib/Papers';
import Avatar from 'react-md/lib/Avatars';
import FontIcon from 'react-md/lib/FontIcons';
import type { Tag } from '../../../../../types/models';

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
      {
        props.tags.map(tag =>
          <ListItem
            key={ tag.id }
            primaryText={ tag.name }
            rightIcon={ <FontIcon onClick={ () => handleClickDelete(tag) }>delete_forever</FontIcon> }
            secondaryText={ tag.description }
            onClick={ () => handleClick(tag) }
          />)
      }
    </div>
  );
};

export default TagList;

/* @flow */

import React, { PropTypes } from 'react';
import ListItem from 'react-md/lib/Lists/ListItem';
import Paper from 'react-md/lib/Papers';
import type { Tag } from '../../../../../types/models';

type Props = {
  tags: Array<Tag>,
  handleTagClick: Function
};

const TagList = (props: Props) => {
  function handleClick(tag: Object) {
    props.handleTagClick(tag);
  }
  return (
    <div>
      {
        props.tags.map(tag =>
          <ListItem
            key={ tag.id }
            primaryText={ tag.name }

            secondaryText={ tag.description }
            onClick={ () => handleClick(tag) }
          />)
      }
    </div>
  );
};

export default TagList;

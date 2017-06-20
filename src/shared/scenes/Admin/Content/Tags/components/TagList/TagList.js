/* @flow */

import React from 'react';
import Link from 'react-router-dom/Link';
import { gql, graphql } from 'react-apollo';
import IconButton from 'material-ui/IconButton';
import ListItem from 'material-ui/List/ListItem';
// internal
import FontIcon from '~components/FontIcon';

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
          <ListItem
            primaryText={tag.name}
            rightIconButton={
              <IconButton onTouchTap={() => handleClickDelete(tag)} tooltip="Delete">
                <FontIcon>
                  delete_forever
                </FontIcon>
              </IconButton>
            }
            secondaryText={tag.description}
          />
        </Link>,
      )}
    </div>
  );
};

export default TagList;

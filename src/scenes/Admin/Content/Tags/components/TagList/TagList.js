/* @flow */

import React from 'react';
import Link from 'react-router-dom/Link';
import { gql, graphql } from 'react-apollo';
import IconButton from 'material-ui/IconButton';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
// internal
import FontIcon from '../../../../../../components/FontIcon';

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
          <ListItem>
            <ListItemIcon onClick={() => handleClickDelete(tag)}>
              <FontIcon>
                delete_forever
              </FontIcon>
            </ListItemIcon>
            <ListItemText primary={tag.name} secondary={tag.description} />
          </ListItem>
        </Link>,
      )}
    </div>
  );
};

export default TagList;

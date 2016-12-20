/* @flow */
import React from 'react';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

const Author = (props: { display_name: String, avatar_url: String }) => {
  return (
    <div className="post__sidebar-author">
        <List>
          <ListItem
            disabled
            leftAvatar={
              <Avatar src={ props.avatar_url } />
            }
          >
            { props.first_name } { props.last_name }
          </ListItem>

        </List>

      </div>
  );
};

export default Author;

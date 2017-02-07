/* @flow */
import React from 'react';
import Link from 'react-router/lib/Link';
import Avatar from 'react-md/lib/Avatars';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';

const Author = (props: { username: String, avatar_url: String, last_name: String, first_name: String }) => {
  const authorName = <Link to={ `/profiles/${props.username}`}>{ props.username }</Link>;
  return (
    <div className="boldr-post__sidebar-author">
        <List>
          <ListItem
            disabled
            primaryText={ authorName }
            leftAvatar={
              <Avatar src={ props.avatar_url } role="presentation" />
            }
          />

        </List>

      </div>
  );
};

export default Author;

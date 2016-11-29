/* @flow */
import React from 'react';
import { Card, Feed } from 'semantic-ui-react';

const Author = (props: { display_name: String, avatar_url: String }) => {
  return (
    <div className="post__sidebar-author">
        <Feed>
          <Feed.Event>
            <Feed.Label image={ props.avatar_url } />
            <Feed.Content>
              <Feed.Summary>
                { props.first_name } { props.last_name }
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        </Feed>

      </div>
  );
};

export default Author;

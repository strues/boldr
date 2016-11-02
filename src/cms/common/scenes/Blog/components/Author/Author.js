/* @flow */
import React from 'react';
import { Card, Feed } from 'semantic-ui-react';

const Author = (props: { display_name: String, avatar_url: String }) => {
  return (
    <div className="post__sidebar-author">
    <Card className="post__sidebar-card">
      <Card.Content>
        <Feed>
          <Feed.Event>
            <Feed.Label image={ props.avatar_url } />
            <Feed.Content>
              <Feed.Summary>
                { props.display_name }
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      </Card.Content>
    </Card>
      </div>
  );
};

export default Author;

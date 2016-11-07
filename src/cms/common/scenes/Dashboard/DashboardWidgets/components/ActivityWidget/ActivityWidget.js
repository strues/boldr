import React, { PropTypes } from 'react';
import { Segment, Feed, Icon, Header } from 'semantic-ui-react';

const ActivityWidget = (props) => {
  return (
    <Segment className="activity-feed__wrap">
    <Header size="large"><Icon name="feed" /> <Header.Content>Recent Activity</Header.Content></Header>
      <Feed>
      {
        props.activities.map(a =>
          <Feed.Event key={ a.id }>
            <Feed.Label>
              { a.action }
            </Feed.Label>
            <Feed.Content>
              <Feed.Date>
                { a.created_at }
              </Feed.Date>
              <Feed.Summary>
                <Feed.User>{ a.owner.display_name }</Feed.User> added { a.name }
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>,
        )
      }
      </Feed>
    </Segment>
  );
};

export default ActivityWidget;

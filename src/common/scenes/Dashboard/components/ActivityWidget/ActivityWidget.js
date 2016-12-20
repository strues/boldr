/* @flow */
import React from 'react';
import { List, ListItem } from 'material-ui/List';
import { Heading } from 'components/index';
import Avatar from 'material-ui/Avatar';
import NewIcon from 'material-ui/svg-icons/av/new-releases';

type Props = {
  activities: Array<Object>
}
const ActivityWidget = (props: Props) => {
  return (
    <div className="activity-feed__wrap">
      <Heading size={ 2 }>
        <NewIcon /> Recent Activity
      </Heading>
      <List>
      {
        props.activities.map(a =>
          <ListItem key={ a.id }
            leftAvatar={ <Avatar src={ a.owner.avatar_url } /> }
            primaryText={ a.action }
            secondaryText={ a.created_at }
          />,
        )
      }
      </List>
    </div>
  );
};

export default ActivityWidget;

/* @flow */
import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import NewIcon from 'material-ui/svg-icons/av/new-releases';
import Paper from 'material-ui/Paper';
import { Heading } from '../../../../components/index';

type Props = {
  activities: Array<Object>
};
const ActivityWidget = (props: Props) => {
  return (
    <div className="boldr-widget__activity">
    <Paper zDepth={ 1 }>
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
      </Paper>
    </div>
  );
};

export default ActivityWidget;

/* @flow */
import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import NewIcon from 'material-ui/svg-icons/av/new-releases';
import Paper from 'material-ui/Paper';
import { Heading } from '../../../../components/index';

type Props = {
  activities: Array<Object>
};
const ActivityWidget = (props: Props) => {
  return (
    <div className="boldr-widget__activity">
    <Paper zDepth={ 2 }>
      <Heading top="5px" align="left" size={ 4 } color="#555">
        <NewIcon style={ { paddingTop: '5px' } } color="#555" /> Recent Activity
      </Heading>
    <Divider />
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

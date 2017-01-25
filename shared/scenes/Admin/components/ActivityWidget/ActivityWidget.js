/* @flow */
import React from 'react';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import Avatar from 'react-md/lib/Avatars';
import Divider from 'react-md/lib/Dividers';
import FontIcon from 'react-md/lib/FontIcons';
import Paper from 'react-md/lib/Papers';
import { Heading } from '../../../../components/index';
import ActivityItem from '../ActivityItem';

type Props = {
  activities: Array<Object>
};
const ActivityWidget = (props: Props) => {
  return (

    <Paper zDepth={ 2 } style={ { padding: '1em' } }>
      <Heading top="5px" align="left" size={ 4 } color="#555">
        <FontIcon style={ { paddingTop: '5px' } }>new_releases</FontIcon> Recent Activity
      </Heading>
    <Divider />
      <div>
      {
        props.activities.map(a =>
          <ActivityItem key={ a.id } {...a} />
        )
      }
      </div>
      </Paper>

  );
};

export default ActivityWidget;

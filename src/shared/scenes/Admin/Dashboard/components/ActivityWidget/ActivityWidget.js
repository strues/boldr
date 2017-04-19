/* @flow */
import React from 'react';
import { Avatar, Paper, Divider, FontIcon, Toolbar, Heading } from 'boldr-ui';

import ActivityItem from '../ActivityItem';

type Props = {
  activities: Array<Object>,
};
const ActivityWidget = (props: Props) => {
  return (
    <Paper zDepth={2}>
      <Toolbar
        title="Recent Activity"
        nav={null}
        actions={<Avatar icon={<FontIcon>new_releases</FontIcon>} />}
        colored
      />
      <Divider />
      <div>
        {props.activities.map(a => <ActivityItem key={a.id} {...a} />)}
      </div>
    </Paper>
  );
};

export default ActivityWidget;

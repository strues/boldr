/* @flow */
import React from 'react';
import Avatar from 'react-md/lib/Avatars';
import Toolbar from 'react-md/lib/Toolbars';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import Divider from 'react-md/lib/Dividers';
import FontIcon from 'react-md/lib/FontIcons';
import Paper from 'react-md/lib/Papers';

import { Heading } from '../../../../../components/index';
import ActivityItem from '../ActivityItem';

type Props = {
  activities: Array<Object>,
};
const ActivityWidget = (props: Props) => {
  return (
    <Paper zDepth={ 2 } className="boldr-paperoverride">
      <Toolbar
        title="Recent Activity"
        nav={ null }
        actions={ <Avatar icon={ <FontIcon>new_releases</FontIcon> } /> }
        colored
      />
      <Divider />
      <div>
        {props.activities.map(a => <ActivityItem key={ a.id } { ...a } />)}
      </div>
    </Paper>
  );
};

export default ActivityWidget;

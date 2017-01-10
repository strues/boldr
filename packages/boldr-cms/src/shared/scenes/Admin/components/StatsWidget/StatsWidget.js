/* @flow */
import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import StatsIcon from 'material-ui/svg-icons/action/assessment';
import Paper from 'material-ui/Paper';
import { Heading } from '../../../../components/index';
import type { Stats } from '../../../../types/models';

type Props = {
  stats: Stats,
};
const StatsWidget = (props: Props) => {
  return (
    <div className="boldr-widget__stats">
    <Paper zDepth={ 2 }>
      <Heading top="5px" align="left" size={ 4 } color="#555">
        <StatsIcon style={ { paddingTop: '5px' } } />{ ' ' } Stats
      </Heading>
      Posts: { props.stats.posts || '' } <br />
      Tags: { props.stats.tags || '' }<br />
      Users: { props.stats.users || '' }<br />
      </Paper>
    </div>
  );
};

export default StatsWidget;

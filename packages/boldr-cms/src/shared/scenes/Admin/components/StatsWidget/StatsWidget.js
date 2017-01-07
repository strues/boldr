/* @flow */
import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import NewIcon from 'material-ui/svg-icons/av/new-releases';
import Paper from 'material-ui/Paper';
import { Heading } from '../../../../components/index';
import type { Stats } from '../../../../types/models';

type Props = {
  stats: Stats,
};
const StatsWidget = (props: Props) => {
  return (
    <div className="boldr-widget__stats">
    <Paper zDepth={ 1 }>
      <Heading size={ 2 }>
        <NewIcon />{ ' ' } Stats
      </Heading>
      Posts: { props.stats.posts || '' } <br />
      Tags: { props.stats.tags || '' }<br />
      Users: { props.stats.users || '' }<br />
      </Paper>
    </div>
  );
};

export default StatsWidget;

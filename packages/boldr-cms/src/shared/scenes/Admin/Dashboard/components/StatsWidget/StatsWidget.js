/* @flow */
import React from 'react';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import Avatar from 'react-md/lib/Avatars';
import Divider from 'react-md/lib/Dividers';
import FontIcon from 'react-md/lib/FontIcons';
import Paper from 'react-md/lib/Papers';

import { Heading } from '../../../../../components/index';
import type { Stats } from '../../../../../types/models';

type Props = {
  stats: Stats,
};
const StatsWidget = (props: Props) => {
  return (
    <div className="boldr-widget__stats">
      <Paper zDepth={ 2 } style={ { padding: '1em' } } className="boldr-paperoverride">
        <Heading top="5px" align="left" size={ 4 }>
          <FontIcon style={ { paddingTop: '5px' } }>assessment</FontIcon>{' '} Stats
        </Heading>
        Posts: {props.stats.posts || ''} <br />
        Tags: {props.stats.tags || ''}<br />
        Users: {props.stats.users || ''}<br />
      </Paper>
    </div>
  );
};

export default StatsWidget;

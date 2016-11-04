/* @flow */
import React from 'react';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import BlockForm from '../BlockForm';

const Blocks = (props) => {
  return (
    <Grid>
      <Grid.Column stretched width={ 12 }>
         <Segment>
           Blocks
         </Segment>
      </Grid.Column>
      <Grid.Column>
        <BlockForm />
      </Grid.Column>
    </Grid>
  );
};

export default Blocks;

import React from 'react';
import { Grid } from 'semantic-ui-react';

const Hero = props => (
  <div className="primary-hero">
    <Grid>
      <Grid.Column floated="right" width={ 7 }>
       <h1 className="hero__tag">
         A <span style={ { color: 'rgb(229, 0, 80)' } }>modern</span> content management framework.
       </h1>
     </Grid.Column>
     </Grid>
  </div>
);

export default Hero;

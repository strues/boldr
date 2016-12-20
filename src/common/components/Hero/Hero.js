import React from 'react';
import { Grid, Col } from '../Layout';

const Hero = props => (
  <div className="primary-hero">
    <Grid>
      <Col xs={ 12 } md={ 8 } mdOffset={ 4 }>
       <h1 className="hero__tag">
         A <span style={ { color: 'rgb(229, 0, 80)' } }>modern</span> content management framework.
       </h1>
     </Col>
     </Grid>
  </div>
);

export default Hero;

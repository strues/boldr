import React from 'react';
import styled from 'styled-components';
import Heading from '../Heading';
import { Grid, Col } from '../Layout';

const BoldrHero = styled.div`
  background-color: #02BCD6;
  color: #555;
  padding-top: 125px;
  height: 450px;
  position: relative;
  text-align: right;
  border-bottom: 1px solid #444;
`;
const Hero = props => (
  <div className="boldr-hero">
    <BoldrHero>
      <Col xs={ 12 } md={ 8 } mdOffset={ 4 }>
         <Heading size={ 1 }>
           A <span style={ { color: 'rgb(229, 0, 80)' } }>modern</span> content management framework.
         </Heading>
       </Col>
     </BoldrHero>
  </div>
);

export default Hero;

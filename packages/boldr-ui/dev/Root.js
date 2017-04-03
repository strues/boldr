import React, { Component } from 'react';
import '../src/styles/main.scss';

import { Grid, Col, Row, Footer, Heading, FormGroup, StatsWidget } from '../src/components';

class Root extends Component {

  render() {
    const testStats = {
      posts: 3,
      users: 4,
      tags: 3,
      dogs: 9,
      cats: 0,
    };
    return (
      <div>
        <Grid>
          <Row>
            <Col md={12}>
              <Heading size={ 1 }>Hi, Heading</Heading>
              <FormGroup paddingTop="20px" paddingBottom="25px">Hi</FormGroup>

              <StatsWidget stats={ testStats } />
            </Col>
          </Row>
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default Root;

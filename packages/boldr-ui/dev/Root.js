import React, { Component } from 'react';
import '../src/styles/main.scss';

import { Grid, Col, Row, Footer, Heading, FormGroup } from '../src/components';

class Root extends Component {

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={12}>
              <Heading size={ 1 }>Hi, Heading</Heading>
              <FormGroup paddingTop="20px" paddingBottom="25px">Hi</FormGroup>
            </Col>
          </Row>
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default Root;

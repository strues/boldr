/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Heading, Grid, Button, Col, Row } from 'components/index';
import { Card } from 'semantic-ui-react';
import { verifyAccount } from 'state/dux/auth';

export type Props = {
  dispatch: () => void,
  params: Object
};

class Verify extends Component {
  constructor(props: Props) {
    super(props);
    (this: any).handleVerify = this.handleVerify.bind(this);
  }
  props: Props;

  handleVerify(event, props): void {
    event.preventDefault();
    this.props.dispatch(verifyAccount(this.props.params.token));
  }

  render() {
    return (
      <div>
        <Grid fluid>
        <Row>
          <Col xs={ 12 }>
            <Row xsCenter>
              <Col xs={ 6 }>
              <Card style={ { width: '450px', marginTop: '150px' } }>
                <Card.Content>
                  <Heading size={ 1 } bottom="10px">Account verification</Heading>

                  <Button onClick={ this.handleVerify }>Verify Account</Button>
                  </Card.Content>
              </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Verify);

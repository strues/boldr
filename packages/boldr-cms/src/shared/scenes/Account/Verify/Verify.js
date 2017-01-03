/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import { Grid, Col, Row } from '../../../components/index';
import { verifyAccount } from '../actions';

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
                    <CardTitle title="Account verification" />
                    <CardText>
                      <RaisedButton primary label="Verify" onTouchTap={ this.handleVerify } />
                    </CardText>
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

export default connect()(Verify);

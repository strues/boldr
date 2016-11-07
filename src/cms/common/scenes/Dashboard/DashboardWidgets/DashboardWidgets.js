import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Widget from 'components/Widget';

import { Col, Row } from 'components/index';
import { loadSiteActivity } from '../reducer';
import ActivityWidget from './components/ActivityWidget';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    promises.push(dispatch(loadSiteActivity()));
    return Promise.all(promises);
  },
}])
class DashboardWidgets extends Component {
  componentDidMount() {
    this.props.loadSiteActivity();
  }
  render() {
    return (
      <div>
        <Row>
          <Col xs={ 6 } md={ 3 }>
            <Widget name="Widget A" />
          </Col>
          <Col xs={ 6 } md={ 3 }>
            <Widget name="Widget C" />
          </Col>
          <Col xs={ 12 } md={ 6 }>
            <Widget name="Widget D" />
          </Col>
        </Row>
        <Row style={ { marginTop: '1.5em' } }>
        {
          this.props.activities ? <ActivityWidget activities={ this.props.activities } /> : null
        }
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activities: state.dashboard.activities,
  };
}
export default connect(mapStateToProps, { loadSiteActivity })(DashboardWidgets);

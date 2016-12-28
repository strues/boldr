import React, { Component } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { Col, Row, Widget } from '../../../components/index';
import ActivityWidget from '../components/ActivityWidget';
import { loadSiteActivity } from './reducer';

@provideHooks({
  fetch: ({ dispatch }) => {
    return dispatch(loadSiteActivity());
  },
})
export class Dashboard extends Component {
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
export default connect(mapStateToProps, { loadSiteActivity })(Dashboard);

/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { Col, Row, Widget } from '../../../components/index';
import ActivityWidget from '../components/ActivityWidget';
import StatsWidget from '../components/StatsWidget';
import type { Stats } from '../../../types/models';
import { loadSiteActivity, fetchStats } from '../../../state/modules/admin/dashboard/actions';

type Props = {
  loadSiteActivity: Function,
  fetchStats: Function,
  activities: Object,
  loading: boolean,
  stats: Stats,
}

@provideHooks({
  fetch: ({ dispatch }) => {
    return Promise.all([
      dispatch(loadSiteActivity()),
      dispatch(fetchStats()),
    ]);
  },
})
export class Dashboard extends Component {
  componentDidMount() {
    this.props.loadSiteActivity();
    this.props.fetchStats();
  }
  props: Props;
  render() {
    if (this.props.loading) {
      return (
        <h1>Loading</h1>
      );
    }
    return (
      <div>
        <Row>
          <Col xs={ 6 } md={ 3 }>
            <StatsWidget stats={ this.props.stats } />
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
            this.props.activities
            ? <ActivityWidget activities={ this.props.activities } />
            : null
          }
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    postCount: state.entities.posts,
    activities: state.admin.dashboard.activities,
    stats: state.admin.dashboard.stats,
    loading: state.admin.dashboard.loading,
  };
}
export default connect(mapStateToProps, { loadSiteActivity, fetchStats })(Dashboard);

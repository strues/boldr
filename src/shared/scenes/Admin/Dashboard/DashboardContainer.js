/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Grid, Col, Loader } from 'boldr-ui';
import { fetchActivityIfNeeded, fetchStatsIfNeeded } from '../../../state/modules/admin/dashboard/actions';

import Dashboard from './Dashboard';

type Props = {
  children: ReactElement,
  dispatch?: Function,
  fetchStatsIfNeeded: Function,
  fetchActivityIfNeeded: Function,
  loading: boolean,
  activities: ?Object,
  stats: Object,
};

class DashboardContainer extends Component {
  componentDidMount() {
    this.props.fetchActivityIfNeeded();
    this.props.fetchStatsIfNeeded();
  }
  props: Props;
  render() {
    return <Dashboard activities={ this.props.activities } stats={ this.props.stats } loading={ this.props.loading } />;
  }
}

function mapStateToProps(state) {
  return {
    activities: state.admin.dashboard.activities,
    stats: state.admin.dashboard.stats,
    loading: state.admin.dashboard.loading,
  };
}

export default connect(mapStateToProps, {
  fetchActivityIfNeeded,
  fetchStatsIfNeeded,
})(DashboardContainer);

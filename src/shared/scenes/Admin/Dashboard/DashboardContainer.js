/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Grid, Col, Loader } from 'boldr-ui';
import { loadSiteActivity, fetchStats } from '../../../state/modules/admin/dashboard/actions';

import Dashboard from './Dashboard';

type Props = {
  children: ReactElement,
  dispatch?: Function,
  fetchStats: Function,
  loadSiteActivity: Function,
  loading: boolean,
  activities: ?Object,
  stats: Object,
};

class DashboardContainer extends Component {
  static fetchData(dispatch) {
    return Promise.all([dispatch(loadSiteActivity()), dispatch(fetchStats())]);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    DashboardContainer.fetchData(dispatch);
  }
  props: Props;
  render() {
    if (this.props.loading) {
      return <Loader />;
    }
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

export default connect(mapStateToProps)(DashboardContainer);

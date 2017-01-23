/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { ReactElement } from 'types/react';
import { push } from 'react-router-redux';
import AppBar from 'material-ui/AppBar';
import { provideHooks } from 'redial';
import { Grid, Col, Loader } from '../../../components/index';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { loadSiteActivity, fetchStats } from '../../../state/modules/admin/dashboard/actions';
import { showSidebar, hideSidebar } from '../../../state/modules/admin/dashboard/actions';
import Dashboard from './Dashboard';

type Props = {
  children: ReactElement,
  dispatch?: Function,
  showSidebar?: Function,
  hideSidebar?: Function,
  dashboard: ?Object,
  account: Object,
};

@provideHooks({
  fetch: ({ dispatch }) => {
    return Promise.all([
      dispatch(loadSiteActivity()),
      dispatch(fetchStats()),
    ]);
  }
})
class DashboardContainer extends Component {
  componentDidMount() {
    this.props.loadSiteActivity();
    this.props.fetchStats();
  }

  render() {
    if (this.props.loading) {
      return (
        <Loader />
      )
    }
    return (
      <Dashboard activities={ this.props.activities } stats={ this.props.stats } loading={ this.props.loading }/>
    )
  }
}

function mapStateToProps(state) {
  return {
    activities: state.admin.dashboard.activities,
    stats: state.admin.dashboard.stats,
    loading: state.admin.dashboard.loading,
  };
}

export default connect(mapStateToProps, { loadSiteActivity, fetchStats })(DashboardContainer)

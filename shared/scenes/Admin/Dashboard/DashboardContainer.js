/* eslint-disable no-unused-expressions */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { ReactElement } from 'types/react';
import { push } from 'react-router-redux';
import { provideHooks } from 'redial';
import { Grid, Col, Loader } from '../../../components/index';
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

@provideHooks({
  fetch: ({ dispatch }) => {
    return dispatch(loadSiteActivity());
  },
  defer: ({ dispatch }) => {
    return dispatch(fetchStats());
  },
})
class DashboardContainer extends Component {
  componentDidMount() {
    this.props.loadSiteActivity();
    this.props.fetchStats();
  }
  props: Props;
  render() {
    if (this.props.loading) {
      return (
        <Loader />
      );
    }
    return (
      <Dashboard activities={ this.props.activities } stats={ this.props.stats } loading={ this.props.loading } />
    );
  }
}

function mapStateToProps(state) {
  return {
    activities: state.admin.dashboard.activities,
    stats: state.admin.dashboard.stats,
    loading: state.admin.dashboard.loading,
  };
}

export default connect(mapStateToProps, { loadSiteActivity, fetchStats })(DashboardContainer);

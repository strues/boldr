/* @flow */
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import Avatar from 'react-md/lib/Avatars';
import Button from 'react-md/lib/Buttons';
import styled from 'styled-components';
import { Grid, Col, Row } from 'boldr-ui';
import renderRoutes from '../../core/addRoutes';
import { fetchActivityIfNeeded, fetchStatsIfNeeded } from '../../state/modules/admin/dashboard/actions';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Footer from './Footer';

type Props = {
  fetchActivityIfNeeded: () => void,
  fetchStatsIfNeeded: () => void,
  children: any,
  dashboard: ?Object,
  me: Object,
  location: Object,
  ui: Object,
  route: Object,
};
class AdminContainer extends Component {
  static defaultProps: {
    fetchActivityIfNeeded: () => {},
    fetchStatsIfNeeded: () => {},
  };

  props: Props;

  render() {
    const { route, location: { pathname, search } } = this.props;

    return (
      <div className="boldrui-dashboard">
        <TopBar me={ this.props.me } />
        <div className="boldrui-dashboard-body">
          <Sidebar { ...this.props } />
          <main className="main">
            <Grid>
              {renderRoutes(route.routes)}
            </Grid>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activities: state.admin.dashboard.activities,
    stats: state.admin.dashboard.stats,
    loading: state.admin.dashboard.loading,
    routing: state.routing,
    dashboard: state.admin.dashboard,
    boldr: state.boldr,
    me: state.users.me,
    ui: state.boldr.ui,
  };
}

export default connect(mapStateToProps, {
  fetchActivityIfNeeded,
  fetchStatsIfNeeded,
})(AdminContainer);

/* @flow */
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import Avatar from 'react-md/lib/Avatars';
import Button from 'react-md/lib/Buttons';
import styled from 'styled-components';
import { Grid, Col, Row, DashboardFooter, Topbar, Sidebar, SidebarLink, SidebarTitle } from 'boldr-ui';

import renderRoutes from '../../core/addRoutes';
import { fetchActivityIfNeeded, fetchStatsIfNeeded } from '../../state/modules/admin/dashboard/actions';

type Props = {
  fetchActivityIfNeeded: () => void,
  fetchStatsIfNeeded: () => void,
  children: any,
  dashboard: ?Object,
  me: Object,
  location: Object,
  ui: Object,
  route: Object,
  copyright: string,
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
        <Topbar me={ this.props.me } />
        <div className="boldrui-dashboard-body">
          <Sidebar { ...this.props }>
            <SidebarTitle text="content" />
            <SidebarLink href="/admin/posts" text="List Posts" icon="list" />
            <SidebarLink href="/admin/new-post" text="Create Post" icon="note_add" />
            <SidebarLink href="/admin/tags" text="Tags" icon="label" />
            <SidebarTitle text="media" />
            <SidebarLink href="/admin/filemanager" text="File Manager" icon="cloud_upload" />
            <SidebarTitle text="layout" />
            <SidebarLink href="/admin/navigation" text="Navigation Editor" icon="insert_link" />
            <SidebarTitle text="users" />
            <SidebarLink href="/admin/members" text="Members List" icon="people" />
            <SidebarTitle text="site" />
            <SidebarLink href="/admin/settings" text="Settings" icon="settings_applications" />
          </Sidebar>
          <main className="main">
            <Grid fluid>
              {renderRoutes(route.routes)}
            </Grid>
          </main>
        </div>
        <DashboardFooter copyright="© 2017 Steven Truesdell" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activities: state.admin.dashboard.activities,
    stats: state.admin.dashboard.stats,
    loading: state.admin.dashboard.loading,
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

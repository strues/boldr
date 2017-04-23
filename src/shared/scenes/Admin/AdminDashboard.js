/* @flow */
import React, { Component } from 'react';
import NavLink from 'react-router-dom/NavLink';
import styled from 'styled-components';
import last from 'lodash/last';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import {
  Avatar,
  Button,
  Grid,
  Icon,
  Col,
  Row,
  DashboardFooter,
  Sidebar,
  DashboardWrapper,
  Anchor,
  DashboardContent,
  DashboardMain,
  TopbarLink,
  Topbar,
  Loader,
} from 'boldr-ui';
import { showHideSidebar, expandCollapseSideMenu } from '../../state';
import renderRoutes from '../../core/addRoutes';
import sidebarLinks from './sidebarLinks';

type Props = {
  children: any,
  dashboard: ?Object,
  me: Object,
  location: Object,
  match: Object,
  ui: Object,
  route: Object,
  copyright: string,
  dispatch: () => void,
  routing: Object,
};

export class AdminDashboard extends Component {
  props: Props;

  handleHideSidebar = (e): Function => {
    this.props.dispatch(showHideSidebar());
  };

  onExpandCollapse = () => {
    this.props.dispatch(expandCollapseSideMenu());
  };

  render() {
    const {
      route,
      me,
      ui,
      routing,
      location: { pathname, search },
    } = this.props;

    // baseLink,
    return (
      <DashboardWrapper>
        {ui.visible
          ? <Sidebar
              items={sidebarLinks}
              activeItem={routing.location.pathname}
              location={routing.location.pathname}
              visible={ui.visible}
              expanded={ui.expanded}
              onExpandCollapse={this.onExpandCollapse}
              logoImg="https://boldr.io/assets/boldr-logo-white.png"
              logoLink="/"
              isPrimaryColor
            />
          : null}
        <DashboardMain>
          <Topbar
            url={this.props.match.path}
            onMenuClick={this.handleHideSidebar}
            avatarUrl={me.avatarUrl}
            username={me.username}
            link={TopbarLink}
            links={[
              { title: 'Home', url: '/' },
              { title: 'Dashboard', url: '/admin' },
            ]}
          />

          <DashboardContent>
            <Grid fluid>
              {renderRoutes(route.routes)}
            </Grid>
          </DashboardContent>

        </DashboardMain>
      </DashboardWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    dashboard: state.admin.dashboard,
    boldr: state.boldr,
    me: state.users.me,
    routing: state.routing,
    ui: state.boldr.ui,
  };
}

export default connect(mapStateToProps)(AdminDashboard);

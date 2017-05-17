/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Sidebar,
  DashboardWrapper,
  DashboardContent,
  DashboardMain,
  TopbarLink,
  Topbar,
} from 'boldr-ui';
import { selectMe, showHideSidebar, expandCollapseSideMenu } from '../../state';
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
  router: Object,
};

export class AdminDashboard extends Component {
  props: Props;

  handleHideSidebar = () => {
    this.props.dispatch(showHideSidebar());
  };

  onExpandCollapse = () => {
    this.props.dispatch(expandCollapseSideMenu());
  };

  render() {
    const { route, me, ui, router, location: { pathname } } = this.props;

    // baseLink,
    return (
      <DashboardWrapper>
        {ui.visible &&
          <Sidebar
            items={sidebarLinks}
            activeItem={pathname}
            location={router.location.pathname}
            visible={ui.visible}
            expanded={ui.expanded}
            onExpandCollapse={this.onExpandCollapse}
            logoImg="https://boldr.io/assets/boldr-logo-white.png"
            logoLink="/"
            isPrimaryColor
          />}
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
    me: selectMe(state),
    router: state.router,
    ui: state.boldr.ui,
  };
}

export default connect(mapStateToProps)(AdminDashboard);

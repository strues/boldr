/* @flow */
import React, { Component } from 'react';
import NavLink from 'react-router-dom/NavLink';
import styled from 'styled-components';
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
  TopbarLink,
  Topbar,
} from 'boldr-ui';
import {
  showHideSidebar,
  expandCollapseSideMenu,
} from '../../state/modules/boldr/ui/actions';
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

const DashboardLayout = styled.div`
  display: flex;
  height: 100%;
  min-height: 100%;
`;
export class AdminDashboard extends Component {
  state = {
    hidden: false,
  };

  props: Props;

  handleHideSidebar = (e): Function => {
    this.props.dispatch(showHideSidebar());
  };

  onExpandCollapse = () => {
    this.props.dispatch(expandCollapseSideMenu());
  };
  clickActivate = () => {
    const activate = '/item41/a';

    this.setState({ activate });
  };
  render() {
    const {
      route,
      me,
      ui,
      routing,
      location: { pathname, search },
    } = this.props;
    return (
      <div style={{ display: 'flex', height: '100%', minHeight: '100%' }}>
        {ui.visible
          ? <Sidebar
              items={sidebarLinks}
              activeItem={routing.location.pathname}
              location={routing.location.pathname}
              visible={ui.visible}
              expanded={ui.expanded}
              logoImg="https://boldr.io/assets/boldr-white-logo.png"
              logoLink="/"
              isPrimaryColor
            />
          : null}
        <DashboardWrapper>
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
          <DashboardFooter copyright="© 2017 Steven Truesdell" />
        </DashboardWrapper>
      </div>
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

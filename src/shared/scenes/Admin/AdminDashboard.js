/* @flow */
import React, {Component} from 'react';
import NavLink from 'react-router-dom/NavLink';
import {connect} from 'react-redux';
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
  DashboardContent,
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
  ui: Object,
  route: Object,
  copyright: string,
  dispatch: () => void,
  routing: Object,
};

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

    this.setState({activate});
  };
  render() {
    const {route, me, ui, routing, location: {pathname, search}} = this.props;
    return (
      <div
        style={{
          display: 'flex',
          height: '100%',
        }}
      >
        {ui.visible
          ? <Sidebar
              items={sidebarLinks}
              activeItem={routing.location.pathname}
              location={routing.location.pathname}
              // onExpandCollapse={this.onExpandCollapse}
              visible={ui.visible}
              expanded={ui.expanded}
              logoImg="https://boldr.io/logo.png"
              logoLink="/"
              isPrimaryColor
            />
          : null}
        <DashboardWrapper>
          <Topbar
            toggleSidebar={this.handleHideSidebar}
            avatarUrl={me.avatarUrl}
            username={me.username}
          />
          <DashboardContent>
            <Grid fluid>
              {renderRoutes(route.routes)}
            </Grid>
          </DashboardContent>
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

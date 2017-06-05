/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import flatMapDeep from 'lodash/flatMapDeep';

import Grid from '~components/Layout/Grid';
import Sidebar from '~components/Sidebar';
import {
  DashboardWrapper,
  DashboardContent,
  DashboardMain,
} from '~components/Dashboard';
import Topbar from '~components/Topbar';
import TopbarLink from '~components/Topbar/TopbarLink';
import { selectMe, showHideSidebar, expandCollapseSideMenu } from '../../state';
import sidebarLinks from './sidebarLinks';
import routes from './routes';
import Breadcrumbs from './Breadcrumbs';


type Props = {
  flattenedRoutes: Array<{
    path: string,
    component: ReactElement<*>,
    exact: boolean,
  }>,
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

const flattenRoutes = topRoutes =>
  flatMapDeep(topRoutes, ({ routes: nestedRoutes, ...other }) => [
    other,
    ...flattenRoutes(nestedRoutes),
  ]);

export class AdminDashboard extends Component {
  constructor(props: Props) {
    super(props);
    (this: any).flattenedRoutes = flattenRoutes(routes);
  }
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
            location={this.props.location}
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
            <Breadcrumbs location={this.props.location} />
            <Grid fluid>
              <Switch>
                {this.flattenedRoutes.map(props => (
                  <Route key={props.path} {...props} />
                ))}
              </Switch>
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

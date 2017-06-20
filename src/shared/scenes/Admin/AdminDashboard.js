/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import flatMapDeep from 'lodash/flatMapDeep';
// internal
import Grid from '@@components/Layout/Grid';
import AnimatedRouter from '@@components/AnimatedRouter';
import Sidebar from '@@components/Sidebar';
import { DashboardWrapper, DashboardContent, DashboardMain } from '@@components/Dashboard';
import Topbar from '@@components/Topbar';
import TopbarLink from '@@components/Topbar/TopbarLink';
import { hideHeader } from '@@state/modules/boldr/ui/actions';
import flattenRoutes from '@@core/flattenRoutes';
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
  hideHeader: () => void,
  copyright: string,
  dispatch: () => void,
  router: Object,
};

export class AdminDashboard extends Component {
  constructor(props: Props) {
    super(props);
    (this: any).flattenedRoutes = flattenRoutes(routes);
  }

  componentDidMount() {
    this.props.dispatch(hideHeader());
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
            links={[{ title: 'Home', url: '/' }, { title: 'Dashboard', url: '/admin' }]}
          />

          <DashboardContent>
            <Breadcrumbs location={this.props.location} />
            <Grid fluid>
              <AnimatedRouter.Switch>
                {this.flattenedRoutes.map(props =>
                  <AnimatedRouter.Route key={props.path} {...props} />,
                )}
              </AnimatedRouter.Switch>
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

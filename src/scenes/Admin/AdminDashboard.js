/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';

// internal
import Sidebar from '../../components/Sidebar';
import { DashboardWrapper, DashboardContent, DashboardMain } from '../../components/Dashboard';
import Topbar from '../../components/Topbar';
import TopbarLink from '../../components/Topbar/TopbarLink';
import flattenRoutes from '../../core/util/flattenRoutes';
import { selectMe } from '../../state/users/selectors';
import { hideHeader, showHideSidebar, expandCollapseSideMenu } from '../../state/boldr/ui/actions';
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
  hideHeader: Function,
  copyright: string,
  dispatch: Function,
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
    const { me, ui, location: { pathname } } = this.props;

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
            <Switch>
              {this.flattenedRoutes.map(props => <Route key={props.path} {...props} />)}
            </Switch>
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

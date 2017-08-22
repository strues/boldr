/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import Switch from 'react-router-dom/Switch';
import styled from 'styled-components';
import Route from 'react-router-dom/Route';

// internal
import { flattenRoutes, hideHeader, toggleSidebar, toggleCollapse } from '@boldr/core';
import sidebarLinks from './sidebarLinks';
import routes from './routes';
import {
  Breadcrumbs,
  Sidebar,
  Topbar,
  TopbarLink,
  DashboardWrapper,
  DashboardContent,
  DashboardMain,
} from './components';

export type Props = {
  currentUser: Object,
  location: Object,
  match: Object,
  ui: Object,
  dispatch: Function,
};

export type FlattenedRoutes = Array<Object>;

const TbArea = styled.div`width: 100%;`;

export class AdminDashboard extends React.Component<Props, *> {
  constructor(props: Props) {
    super(props);
    (this: any).flattenedRoutes = flattenRoutes(routes);
  }

  componentDidMount() {
    this.props.dispatch(hideHeader());
  }
  props: Props;
  flattenedRoutes: FlattenedRoutes;
  handleToggleSidebar = () => {
    this.props.dispatch(toggleSidebar());
  };

  handleExpandCollapse = () => {
    this.props.dispatch(toggleCollapse());
  };

  render() {
    const { currentUser, ui, location: { pathname } } = this.props;

    return (
      <DashboardWrapper>
        <Sidebar
          items={sidebarLinks}
          activeItem={pathname}
          isExpanded={ui.isExpanded}
          onExpandCollapse={this.handleExpandCollapse}
          logoImg="https://boldr.io/assets/boldr-logo-white.png"
          logoLink="/"
          isSmall={ui.isSmall}
        />
        <DashboardMain>
          <TbArea>
            <Topbar
              url={this.props.match.path}
              onMenuClick={this.handleToggleSidebar}
              avatarUrl={currentUser.avatarUrl}
              username={currentUser.username}
              link={TopbarLink}
              links={[{ title: 'Home', url: '/' }, { title: 'Dashboard', url: '/admin' }]}
            />
          </TbArea>
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
    currentUser: state.auth.info,
    router: state.router,
    ui: state.boldr.ui,
  };
}

export default connect(mapStateToProps)(AdminDashboard);

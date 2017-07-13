/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Switch from 'react-router-dom/Switch';
import styled from 'styled-components';
import Route from 'react-router-dom/Route';

// internal
import flattenRoutes from '../../core/util/flattenRoutes';
import { selectMe } from '../../state/users/selectors';
import { hideHeader, showHideSidebar, expandCollapseSideMenu } from '../../state/boldr/ui/actions';
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

const SideArea = styled.div`
  background-color: green;
  display: flex;
  flex-basis: 275px;

  flex-shrink: 0;

  padding: 1.2em;
  @media screen and (min-width: 600px) {
    width: 180px;
  }
`;

const TbArea = styled.div`
  width: 100%;
  height: 70px;
  margin-bottom: 10px;
`;

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
          <TbArea>
            <Topbar
              url={this.props.match.path}
              onMenuClick={this.handleHideSidebar}
              avatarUrl={me.avatarUrl}
              username={me.username}
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
    me: selectMe(state),
    router: state.router,
    ui: state.boldr.ui,
  };
}

export default connect(mapStateToProps)(AdminDashboard);

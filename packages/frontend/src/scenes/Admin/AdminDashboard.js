/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';

import { flattenRoutes } from '@boldr/core';
import type { FlattenedRoutes, CurrentUser, RouterLocation, MatchPath } from '../../types/boldr';
import routes from './routes';
import Layout from './components/Layout';

export type Props = {
  currentUser: CurrentUser,
  location: RouterLocation,
  match: MatchPath,
  ui: Object,
  dispatch: Function,
};

export class AdminDashboard extends React.Component<Props, *> {
  constructor(props: Props) {
    super(props);
    (this: any).flattenedRoutes = flattenRoutes(routes);
  }

  props: Props;
  flattenedRoutes: FlattenedRoutes;

  render() {
    return (
      <Layout location={this.props.location}>
        <Switch>
          {this.flattenedRoutes.map(props => <Route key={props.path} {...props} />)}
        </Switch>
      </Layout>
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

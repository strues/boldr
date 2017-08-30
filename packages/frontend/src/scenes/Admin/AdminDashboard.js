/* @flow */
import React from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';

import { flattenRoutes } from '@boldr/core';
import { selectCurrentUser } from '../Account/state/selectors';
import type { FlattenedRoutes, CurrentUser, RouterLocation, MatchPath } from '../../types/boldr';
import routes from './routes';
import {
  selectBoldr,
  selectUi,
  selectDashboard,
  selectRouter,
} from './state/selectors/adminSelectors';
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

  flattenedRoutes: FlattenedRoutes;

  render(): Node {
    return (
      <Layout location={this.props.location}>
        <Switch>{this.flattenedRoutes.map(props => <Route key={props.path} {...props} />)}</Switch>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    dashboard: selectDashboard(state),
    boldr: selectBoldr(state),
    currentUser: selectCurrentUser(state),
    router: selectRouter(state),
    ui: selectUi(state),
  };
}

export default connect(mapStateToProps)(AdminDashboard);

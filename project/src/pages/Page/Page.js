/* eslint-disable import/max-dependencies */
/* @flow */
import React from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { createStructuredSelector } from 'reselect';
import Loader from '@boldr/ui/Loader';

import { logout } from '../../scenes/Account/state/actions';

import { selectCurrentUser, selectToken } from '../../scenes/Account/state/selectors';
import type { CurrentUser, RouterLocation } from '../../types/boldr';
import PageLayout from './components/PageLayout';
// graphql

import MENU_QUERY from './gql/getMenu.graphql';

export type Props = {
  location: RouterLocation,
  currentUser?: CurrentUser,
  token?: string,
  children: Node,
  logout: Function,
  data: Object,
};

export class Page extends React.Component<Props, *> {
  handleLogoutClick = () => {
    this.props.logout();
  };

  render(): Node {
    const { data: { loading, getMenuById }, token, currentUser, location } = this.props;
    if (loading) {
      return <Loader />;
    } else {
      return (
        <PageLayout
          location={location}
          onClickLogout={this.handleLogoutClick}
          token={token}
          currentUser={currentUser}
          menu={getMenuById}>
          {this.props.children}
        </PageLayout>
      );
    }
  }
}

const mapStateToProps = createStructuredSelector({
  token: selectToken(),
  currentUser: selectCurrentUser(),
});
// $FlowIssue
const PageComponentWithData = graphql(MENU_QUERY, {
  // $FlowIssue
  options: () => ({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: 1,
    },
  }),
  // $FlowIssue
})(Page);
// $FlowIssue
export default connect(mapStateToProps, { logout })(PageComponentWithData);

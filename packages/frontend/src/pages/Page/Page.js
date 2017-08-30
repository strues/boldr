/* @flow */
import React from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { createStructuredSelector } from 'reselect';
import Loader from '@boldr/ui/Loader';
// internal
import Profile from '../../scenes/Profile';
import LoginContainer from '../../scenes/Account/Login';
import SignupContainer from '../../scenes/Account/Signup';
import AccountContainer from '../../scenes/Account';
import BlogContainer from '../../scenes/Blog';
import { logout } from '../../scenes/Account/state/actions';
import { selectCurrentUser, selectToken } from '../../scenes/Account/state/selectors';
import Home from '../Home';
import About from '../About';
import type { CurrentUser, RouterLocation } from '../../types/boldr';
import PageLayout from './components/PageLayout';
// graphql

import MENU_QUERY from './gql/getMenu.graphql';

export type Props = {
  location: RouterLocation,
  currentUser?: CurrentUser,
  token?: string,
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
          <Switch>
            <Route path="/login" component={LoginContainer} />
            <Route path="/signup" component={SignupContainer} />
            <Route path="/account" component={AccountContainer} />
            <Route path="/profiles/:username" component={Profile} />
            <Route path="/blog" component={BlogContainer} />
            <Route path="/about" exact component={About} />
            <Route path="/" exact component={Home} />
          </Switch>
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
    fetchPolicy: 'cache-first',
    variables: {
      id: 1,
    },
  }),
  // $FlowIssue
})(Page);
// $FlowIssue
export default connect(mapStateToProps, { logout })(PageComponentWithData);

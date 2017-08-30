/* @flow */
import React from 'react';
import type { Node } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { createStructuredSelector } from 'reselect';
import Loader from '@boldr/ui/Loader';
// internal
import { Footer, Container } from '@boldr/ui/Layout';
import Profile from '../../scenes/Profile';
import LoginContainer from '../../scenes/Account/Login';
import SignupContainer from '../../scenes/Account/Signup';
import AccountContainer from '../../scenes/Account';
import BlogContainer from '../../scenes/Blog';
import View from '../../components/View';
import { logout } from '../../scenes/Account/state/actions';
import { selectCurrentUser, selectToken } from '../../scenes/Account/state/selectors';
import Home from '../Home';
import About from '../About';
import type { CurrentUser, RouterLocation } from '../../types/boldr';
import Navigation from './components/Navigation';

// graphql

import MENU_QUERY from './gql/getMenu.graphql';

export type Props = {
  location: RouterLocation,
  currentUser?: CurrentUser,
  token?: string,
  logout: Function,
  data: Object,
};

const ContentWrapper = styled.section`
  width: 100%;
  height: 100%;
  min-height: 100%;
  padding-top: 52px;
  padding-bottom: 70px;
`;

export class Page extends React.Component<Props, *> {
  handleLogoutClick = () => {
    this.props.logout();
  };

  render(): Node {
    const { data: { loading, getMenuById }, token, currentUser, location } = this.props;
    return (
      <View>
        {loading ? (
          <Loader />
        ) : (
          <Navigation
            location={location}
            onLogout={this.handleLogoutClick}
            token={token}
            currentUser={currentUser}
            menu={getMenuById}
          />
        )}
        <ContentWrapper>
          <Switch>
            <Route path="/login" component={LoginContainer} />
            <Route path="/signup" component={SignupContainer} />
            <Route path="/account" component={AccountContainer} />
            <Route path="/profiles/:username" component={Profile} />
            <Route path="/blog" component={BlogContainer} />
            <Route path="/about" exact component={About} />
            <Route path="/" exact component={Home} />
          </Switch>
        </ContentWrapper>
        <Footer id="footer">
          <Container>Footer</Container>
        </Footer>
      </View>
    );
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

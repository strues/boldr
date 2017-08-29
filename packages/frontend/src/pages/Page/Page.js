/* @flow */
import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { graphql } from 'react-apollo';
import Loader from '@boldr/ui/Loader';
// internal
import { showHeader } from '@boldr/core';
import { Footer, Container } from '@boldr/ui/Layout';
import Profile from '../../scenes/Profile';
import LoginContainer from '../../scenes/Account/Login';
import SignupContainer from '../../scenes/Account/Signup';
import AccountContainer from '../../scenes/Account';
import BlogContainer from '../../scenes/Blog';
import View from '../../components/View';
import { logout } from '../../scenes/Account/state/actions';
import Home from '../Home';
import About from '../About';
import type { CurrentUser, RouterLocation } from '../../types/boldr';
import Navigation from './components/Navigation';

// graphql

import MENU_QUERY from './gql/getMenu.graphql';

export type Props = {
  location: RouterLocation,
  currentUser?: CurrentUser,
  auth: Object,
  showHeader: () => void,
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
  componentDidMount() {
    this.props.showHeader();
  }
  handleLogoutClick = () => {
    this.props.logout();
  };

  render(): React.Node {
    const { data: { loading, getMenuById }, auth, currentUser, location } = this.props;
    return (
      <View>
        {loading
          ? <Loader />
          : <Navigation
              location={location}
              onLogout={this.handleLogoutClick}
              auth={auth}
              currentUser={currentUser}
              menu={getMenuById}
            />}
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

const mapStateToProps = state => {
  return {
    auth: state.auth,
    currentUser: state.auth.info,
  };
};
// $FlowIssue
const PageComponentWithData = graphql(MENU_QUERY, {
  // $FlowIssue
  options: () => ({
    variables: {
      id: 1,
    },
  }),
})(Page);
// $FlowIssue
export default connect(mapStateToProps, { showHeader, logout })(PageComponentWithData);

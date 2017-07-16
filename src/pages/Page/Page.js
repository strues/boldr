/* @flow */
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import universal from 'react-universal-component';
import Icon from '@boldr/ui/Icons/Icon';

// internal
import { showHeader } from '../../state/boldr/ui/actions';
import ProfileContainer from '../../scenes/Profile/ProfileContainer';
// Blog
import BlogContainer from '../../scenes/Blog/BlogContainer';
import { logout } from '../../scenes/Account/state/actions';
// import Navbar from '../../components/Navbar';
import Home from '../Home';
import About from '../About';
import Error404 from '../Error404';
import MENU_QUERY from './getMenu.graphql';
import PAGES_QUERY from './page.graphql';
import Navigation from './components/Navigation';

export type Props = {
  location: Object,
  me: ?User,
  isMobile: boolean,
  auth: Object,
  showHeader: () => void,
  loading: boolean,
  logout: Function,
  data: Object,
};

const Wrapper = styled.div`
  min-height: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const ContentWrapper = styled.section`
  width: 100%;
  height: 100%;
  min-height: 100%;
  padding-top: 70px;
`;

const AccountContainer = universal(() => import('../../scenes/Account/AccountContainer'), {
  resolve: () => require.resolveWeak('../../scenes/Account/AccountContainer'),
});
const LoginContainer = universal(() => import('../../scenes/Account/Login'), {
  resolve: () => require.resolveWeak('../../scenes/Account/Login'),
});
const SignupContainer = universal(() => import('../../scenes/Account/Signup'), {
  resolve: () => require.resolveWeak('../../scenes/Account/Signup'),
});

export class Page extends Component {
  componentDidMount() {
    this.props.showHeader();
  }
  handleLogoutClick = () => {
    this.props.logout();
  };

  props: Props;
  render() {
    const { data: { loading, getMenuById }, showHeader, auth, me } = this.props;
    return (
      <Wrapper>
        {this.props.data.loading
          ? <span>loading</span>
          : <Navigation
              location={this.props.location}
              onLogout={this.handleLogoutClick}
              visible={showHeader}
              auth={auth}
              currentUser={me}
              menu={getMenuById}
            />}
        <ContentWrapper>
          <Switch>
            <Route path="/login" component={LoginContainer} />
            <Route path="/signup" component={SignupContainer} />
            <Route path="/account" component={AccountContainer} />

            <Route path="/profiles/:username" component={ProfileContainer} />
            <Route path="/blog" component={BlogContainer} />
            <Route path="/about" exact component={About} />
            <Route path="/" exact component={Home} />
          </Switch>
        </ContentWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    showHeader: state.boldr.ui.showHeader,
    auth: state.auth,
    me: state.auth.info,
  };
};

const PageComponentWithData = graphql(MENU_QUERY, {
  options: props => ({
    variables: {
      id: 1,
    },
  }),
})(Page);

export default connect(mapStateToProps, { showHeader, logout })(PageComponentWithData);

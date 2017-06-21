/* @flow */
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import Footer from '@@components/Footer';
import { showHeader } from '@@state/modules/boldr/ui/actions';
import Hero from '../../components/Hero';
// Account
import SignupContainer from '../../scenes/Account/Signup/SignupContainer';
import LoginContainer from '../../scenes/Account/Login';
import ForgotPassword from '../../scenes/Account/ForgotPassword';
import ResetPassword from '../../scenes/Account/ResetPassword';
import Verify from '../../scenes/Account/Verify';
import PreferencesContainer from '../../scenes/Account/Preferences';
// Profile
import ProfileContainer from '../../scenes/Profile/ProfileContainer';
// Blog
import BlogContainer from '../../scenes/Blog/BlogContainer';
import Home from '../Home';
import About from '../About';
import Error404 from '../Error404';

export type Props = {
  me: ?User,
  isMobile: boolean,
  auth: Object,
  showHeader: () => void,
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
`;

export class Page extends Component {
  componentDidMount() {
    this.props.showHeader();
  }
  props: Props;
  render() {
    return (
      <Wrapper>
        <ContentWrapper>
          <Route path="/login" component={LoginContainer} />
          <Route path="/signup" component={SignupContainer} />
          <Route path="/account/forgot-password" component={ForgotPassword} />
          <Route path="/account/reset-password/:token" exact component={ResetPassword} />
          <Route path="/account/verify/:token" exact component={Verify} />
          <Route path="/account/preferences" component={PreferencesContainer} />
          <Route path="/profiles/:username" component={ProfileContainer} />
          <Route path="/blog" component={BlogContainer} />
          <Route path="/about" exact component={About} />
          <Route path="/" exact component={Home} />
        </ContentWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    showHeader: state.boldr.ui.showHeader,
  };
};
export default connect(mapStateToProps, { showHeader })(Page);

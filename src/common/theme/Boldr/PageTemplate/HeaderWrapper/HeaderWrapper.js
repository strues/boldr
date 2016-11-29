/* @flow */
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout, getByLabel, getSettings } from 'state/index';
import { PrimaryHeader } from 'components/index';

type Props = {
  header: ReactElement,
  helmetMeta?: ReactElement,
  hero?: ReactElement,
  children: ReactChildren,
  footer?: ReactElement,
  navigate: Function,
  actions: Object,
  navigation: Object,
  settings: Object,
  auth: Object
};
const mapStateToProps = (state: Object) => {
  return {
    boldr: state.boldr,
    settings: getSettings(state),
    auth: state.auth,
    navigation: getByLabel(state, 'main'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ logout, pushState: push }, dispatch),
    navigate: (url) => dispatch(push(url)),
    dispatch,
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class HeaderWrapper extends Component {
  constructor() {
    super();
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
    this.handlePreferencesClick = this.handlePreferencesClick.bind(this);
    this.handleLogoClick = this.handleLogoClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleDashClick = this.handleDashClick.bind(this);
  }

  handleLoginClick = (e) => {
    this.props.navigate('/account/login');
  }

  handleSignupClick = (e) => {
    this.props.navigate('/account/signup');
  }

  handleProfileClick = (e) => {
    this.props.navigate('/profile');
  }
  handlePreferencesClick = (e) => {
    this.props.navigate('/account/preferences');
  }
  handleLogoClick = (e) => {
    this.props.navigate('/');
  }

  handleLogoutClick = (e) => {
    this.props.actions.logout();
  }

  handleDashClick = (e) => {
    this.props.navigate('/cp');
  }
  props: Props;
  render() {
    const renderDefaultHeader = (
    <PrimaryHeader
      auth={ this.props.auth }
      settings={ this.props.settings }
      navigation={ this.props.navigation }
      handleLoginClick={ this.handleLoginClick }
      handleSignupClick={ this.handleSignupClick }
      handleProfileClick={ this.handleProfileClick }
      handlePreferencesClick={ this.handlePreferencesClick }
      handleLogoClick= { this.handleLogoClick }
      handleLogoutClick={ this.handleLogoutClick }
      handleDashClick={ this.handleDashClick }
    />);

    return (
    <header className="boldr__theme-header">
      { this.props.header || renderDefaultHeader }
    </header>
    );
  }
}
export default HeaderWrapper;

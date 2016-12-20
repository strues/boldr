/* @flow */
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PrimaryHeader from 'components/PrimaryHeader';
import { logout, getByLabel, getSettings } from 'state/index';
import { selectSetting } from 'state/selectors';

import Topbar from 'components/Topbar';

const styled = require('styled-components').default;

const Header = styled.header`
  border-radius: 0px;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  box-sizing: border-box;
  font-family: Roboto, sans-serif;
  color: rgba(0, 0, 0, 0.870588);
  box-shadow: rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px;
  background-color: #1F2439;
  position: relative;
  z-index: 1100;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 24px;
  padding-right: 24px;
  height: 96px;

  @media all and (min-width: 768px) {
    flex-direction: row;
  }
`;

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
  logo: Object,
  auth: Object,
};

const mapStateToProps = (state: Object) => {
  return {
    boldr: state.boldr,
    settings: getSettings(state),
    logo: selectSetting(state, 'site_logo'),
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
    this.handleLogoClick = this.handleLogoClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleDashClick = this.handleDashClick.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
    this.handlePrefClick = this.handlePrefClick.bind(this);
  }

  handleLogoClick = (e) => {
    this.props.navigate('/');
  }
  handleDashClick = (e) => {
    this.props.navigate('/dashboard');
  }
  handleProfileClick = (e) => {
    this.props.navigate('/profile');
  }
  handlePrefClick = (e) => {
    this.props.navigate('/account/preferences');
  }
  handleLogoutClick = (e) => {
    this.props.actions.logout();
  }

  props: Props;
  render() {
    return (
      <PrimaryHeader
        auth={ this.props.auth }
        logo={ this.props.logo }
        settings={ this.props.settings }
        navigation={ this.props.navigation }
        handleLogoClick= { this.handleLogoClick }
        handleLogoutClick={ this.handleLogoutClick }
        handlePrefClick={ this.handlePrefClick }
        handleProfileClick={ this.handleProfileClick }
        handleDashClick={ this.handleDashClick }
      />
    // <Header className="boldr__theme-header">
    //   <Topbar
    //     auth={ this.props.auth }
    //     logo={ this.props.logo }
    //     settings={ this.props.settings }
    //     navigation={ this.props.navigation }
    //     handleLogoClick= { this.handleLogoClick }
    //     handleLogoutClick={ this.handleLogoutClick }
    //     handlePrefClick={ this.handlePrefClick }
    //     handleProfileClick={ this.handleProfileClick }
    //     handleDashClick={ this.handleDashClick }
    //   />
    // </Header>
    );
  }
}
export default HeaderWrapper;

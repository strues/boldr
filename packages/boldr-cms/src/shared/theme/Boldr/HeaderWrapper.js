/* @flow */
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import type { ReactElement, ReactChildren } from '../../types/react';
import PrimaryHeader from '../../components/PrimaryHeader';
import { logout } from '../../scenes/Account/actions';
import { getByLabel } from '../../state/modules/boldr/menu';
import { selectSetting, getSettings } from '../../state/modules/boldr/settings';

const styled = require('styled-components').default;

type Props = {
  header: ReactElement,
  helmetMeta?: ReactElement,
  hero?: ReactElement,
  children: ReactChildren,
  footer?: ReactElement,
  navigate: Function,
  actions: ?Object,
  menu: Object,
  settings: Object,
  logo: Object,
  auth: Object,
};

const mapStateToProps = (state: Object) => {
  return {
    boldr: state.boldr,
    settings: getSettings(state),
    logo: selectSetting(state, 'site_logo'),
    auth: state.account.auth,
    menu: getByLabel(state, 'main'),
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
    this.props.navigate('/admin');
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
        menu={ this.props.menu }
        handleLogoClick= { this.handleLogoClick }
        handleLogoutClick={ this.handleLogoutClick }
        handlePrefClick={ this.handlePrefClick }
        handleProfileClick={ this.handleProfileClick }
        handleDashClick={ this.handleDashClick }
      />
    );
  }
}
export default HeaderWrapper;

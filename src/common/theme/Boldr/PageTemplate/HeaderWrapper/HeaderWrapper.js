/* @flow */
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout, getByLabel, getSettings } from 'state/index';
import { selectSetting } from 'state/selectors';
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
  }

  handleLogoClick = (e) => {
    this.props.navigate('/');
  }

  handleLogoutClick = (e) => {
    this.props.actions.logout();
  }

  props: Props;
  render() {
    const renderDefaultHeader = (
    <PrimaryHeader
      auth={ this.props.auth }
      logo={ this.props.logo }
      settings={ this.props.settings }
      navigation={ this.props.navigation }
      handleLogoClick= { this.handleLogoClick }
      handleLogoutClick={ this.handleLogoutClick }
    />);

    return (
    <header className="boldr__theme-header">
      { this.props.header || renderDefaultHeader }
    </header>
    );
  }
}
export default HeaderWrapper;

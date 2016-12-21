// @flow

import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

type Props = {
  navigate: () => void,
  actions: Object,
  navigation: Object,
  settings: Object,
  logo: Object,
  boldr: Object,
  auth: Object,
  handleLogoClick: () => void,
  handleLogoutClick: () => void,
  handleDashClick: () => void,
  handleProfClick: () => void,
  handlePrefClick: () => void,
};

class PrimaryHeader extends Component {

  props: Props;

  /**
   * @method renderUnauthenticated
   * shows the menu with options for unauthenticated users
   */
  renderUnauthenticated() {
    return (
      <span>
        <RaisedButton primary label="Login" href="/account/login" />
        <RaisedButton secondary label="Sign Up" href="/account/signup" />
    </span>
    );
  }

  /**
   * @method renderAuthenticated
   * shows the menu with options for authenticated users
   */
  renderAuthenticated() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon color="#fff" /></IconButton>
        }
        targetOrigin={ { horizontal: 'right', vertical: 'top' } }
        anchorOrigin={ { horizontal: 'right', vertical: 'top' } }
      >
        <MenuItem onTouchTap={ this.props.handleDashClick } primaryText="Dashboard" />
        <MenuItem onTouchTap={ this.props.handleProfClick } primaryText="Profile" />
        <MenuItem primaryText="Preferences" onTouchTap={ this.props.handlePrefClick } />
        <MenuItem primaryText="Logout" onTouchTap={ this.props.handleLogoutClick } />
      </IconMenu>
    );
  }

  render() {
    if (!this.props.navigation) {
      return (
        <span>Loading...</span>
      );
    }
    const renderedMenuItems = this.props.navigation.details.map((item, i) =>
      <FlatButton
        style={ { marginTop: '-12px' } }
        labelStyle={ { color: '#fff' } }
        key={ item.id }
        label={ item.name }
        href={ item.link }
      />,
    );

    return (
      <div>
      <AppBar
        zDepth={ 1 }
        showMenuIconButton={ false }
        title={
          <img src={ this.props.logo.value }
            className="ph-logo"
            alt="logo" onClick={ this.props.handleLogoClick }
          />
        }
        iconElementRight={
          <span>
            { renderedMenuItems }
            {
              this.props.auth.isAuthenticated
              ? this.renderAuthenticated()
              : this.renderUnauthenticated()
            }
          </span>
        }
      />
    </div>
    );
  }
}

export default PrimaryHeader;

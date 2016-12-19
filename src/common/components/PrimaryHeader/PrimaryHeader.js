// @flow

import React, { PureComponent } from 'react';
import Link from 'react-router/lib/Link';
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
};

class PrimaryHeader extends PureComponent {
  props: Props;

  /**
   * @method renderUnauthenticated
   * shows the menu with options for unauthenticated users
   */
  renderUnauthenticated() {
    return (
      <div>
        <Link className="ph-menu__item-link" to="/account/login">
          <RaisedButton primary label="Login" />
       </Link>
       <Link className="ph-menu__item-link" to="/account/signup">
         <RaisedButton secondary label="Sign Up" />
      </Link>
     </div>
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
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={ { horizontal: 'right', vertical: 'top' } }
        anchorOrigin={ { horizontal: 'right', vertical: 'top' } }
      >
        <Link to="/dashboard"><MenuItem primaryText="Dashboard" /></Link>
        <Link to="/profile"><MenuItem primaryText="Profile" /></Link>
        <Link to="/account/preferences"><MenuItem primaryText="Preferences" /></Link>
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
    const renderedMenuItems = this.props.navigation.links.map((item, i) =>
    <Link key={ item.id } className="ph-menu__item-link" to={ item.href }>
      <FlatButton label={ item.name } />
    </Link>,
    );

    return (

      <AppBar
        title={
          <img src={ this.props.logo.value }
            className="ph-logo"
            alt="logo" onClick={ this.props.handleLogoClick }
          />
        }
        iconElementRight={
          <div>
            { renderedMenuItems }
            {
              this.props.auth.isAuthenticated
              ? this.renderAuthenticated()
              : this.renderUnauthenticated()
            }
          </div>
        }
      />
    );
  }
}

export default PrimaryHeader;

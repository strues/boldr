// @flow

import React, { Component } from 'react';
import MenuButton from 'react-md/lib/Menus/MenuButton';
import Link from 'react-router/lib/Link';
import ListItem from 'react-md/lib/Lists/ListItem';
import Button from 'react-md/lib/Buttons/Button';
import FontIcon from 'react-md/lib/FontIcons';
import Toolbar from 'react-md/lib/Toolbars';
import sortBy from 'lodash/sortBy';

type Props = {
  navigate: () => void,
  actions: Object,
  menu: Object,
  settings: Object,
  logo: Object,
  boldr: Object,
  auth: Object,
  handleLogoClick: () => void,
  handleLogoutClick: () => void,
  handleDashClick: () => void,
};
const styles = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
};

class PrimaryHeader extends Component {
  props: Props;
  render() {
    const menuItems = sortBy(this.props.menu.details, ['position']);
    const renderedMenuItems = menuItems.map((item, i) =>
      <Button
        flat
        key={ item.id }
        label={ item.name }
        href={ item.link }
      />,
    );

    const actions = [];

    if (!this.props.auth.isAuthenticated) {
      actions.push(
        <Button raised primary label="Log In" href="/account/login" />,
        <Button raised secondary label="Sign Up" href="/account/signup" />
      );
    }
    if (this.props.me.roleId === 3) {
      actions.push(
        <Button onClick={ this.props.handleDashClick } icon primary tooltipLabel="Dashboard">dashboard</Button>,
      );
    }
    if (this.props.auth.isAuthenticated) {
      actions.push(
        <Button href={`/profiles/${this.props.me.username}`} icon tooltipLabel="Profile">perm_identity</Button>,
        <Button icon onClick={ this.props.handleLogoutClick } tooltipLabel="Logout">exit_to_app</Button>,
      );
    }
    return (
      <div className="boldr-ph">
        <Toolbar
          colored
          fixed
          title={
            <img src="https://boldr.io/images/boldr-logo-light.png"
              className="boldr-ph__logo"
              alt="logo" onClick={ this.props.handleLogoClick }
            />
          }
          actions={ actions }
        >
          { renderedMenuItems }
      </Toolbar>
      </div>
    );
  }
}

export default PrimaryHeader;

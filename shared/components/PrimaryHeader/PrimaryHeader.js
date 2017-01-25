// @flow

import React, { Component } from 'react';
import MenuButton from 'react-md/lib/Menus/MenuButton';
import ListItem from 'react-md/lib/Lists/ListItem';
import Button from 'react-md/lib/Buttons/Button';
import FontIcon from 'react-md/lib/FontIcons';
import Toolbar from 'react-md/lib/Toolbars';

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
const noop = () => {};
class PrimaryHeader extends Component {
  props: Props;
  render() {
    const renderedMenuItems = this.props.menu.details.map((item, i) =>
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
        <Button raised primary label="Login" href="/account/login" />,
        <Button raised secondary label="Sign Up" href="/account/signup" />
      );
    }
    if (this.props.auth.isAuthenticated) {
      actions.push(
      <Button flat secondary label="Logout" onClick={ this.props.handleLogoutClick } />,
      <Button onClick={ this.props.handleDashClick } icon primary>dashboard</Button>,
      );
    }
    return (
      <div className="boldr-primary-header">
        <Toolbar
          colored
          title={
            <img src="https://boldr.io/boldr.png"
              className="ph-logo"
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

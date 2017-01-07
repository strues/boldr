/* @flow */
import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Avatar from 'material-ui/Avatar';
import TiBell from 'react-icons/lib/ti/bell';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { lightBlue500 } from 'material-ui/styles/colors';

type Props = {
  open: boolean,
  menuButtonClick: () => void,
  title: string,
  user: Object,
  avatarUrl: string,
  displayName: string,
};

const Topbar = (props: Props) => {
  const inline = {
    position: 'fixed',
    left: props.open ? '200px' : '0px',
    right: '0',
    top: '0',
    zIndex: '1100',
    backgroundColor: lightBlue500,
  };
  return (
      <Toolbar className="boldr-topbar" style={ inline }>
        <ToolbarGroup className="boldr-topbar__left" firstChild>
          <IconButton iconStyle={ { color: 'white' } }
            onClick={ props.menuButtonClick }
            className="boldr-topbar__icon"
          >
            <NavigationMenu />
          </IconButton>
           <h3 className="boldr-topbar__title">{ props.title }</h3>
        </ToolbarGroup>
        <ToolbarGroup firstChild style={ { justifyContent: 'space-between', width: '150px' } }>
          <TiBell size={ 30 } />
          <Avatar
            size={ 50 }
            src={ props.user.avatarUrl }
            style={ { border: '1px solid grey', margin: '-5px' } }
          />
          { props.user.displayName }
        </ToolbarGroup>
      </Toolbar>
  );
};

export default Topbar;

import React, { Component } from 'react';

import MenuButton from 'react-md/lib/Menus/MenuButton';
import ListItem from 'react-md/lib/Lists/ListItem';

const TaggedPostMenu = (props) => {
  return (
    <MenuButton
      id="vert-menu"
      icon
      buttonChildren="more_vert"
      className="menu-post"
      tooltipLabel="Open post menu"
    >
      <ListItem primaryText={ props.post.title } />
      <ListItem primaryText="Item Two" />
      <ListItem primaryText="Item Three" />
      <ListItem primaryText="Item Four" />
    </MenuButton>
  );
};

export default TaggedPostMenu;

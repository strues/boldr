import React from 'react';
import MenuButton from 'react-md/lib/Menus/MenuButton';
import ListItem from 'react-md/lib/Lists/ListItem';

const TagToolbarMenu = (props) => (
  <MenuButton id="tagtb" buttonChildren="more_vert" icon { ...props }>
    <ListItem primaryText="Add tag" />
    <ListItem primaryText="Tag a post" />
    <ListItem primaryText="Help" />
  </MenuButton>
);

export default TagToolbarMenu;

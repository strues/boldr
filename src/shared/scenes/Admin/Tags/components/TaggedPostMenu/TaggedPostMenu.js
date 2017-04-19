/* @flow */
import React, { Component } from 'react';
import { MenuButton, ListItem } from 'boldr-ui';

type Props = {
  post: Post,
};

const TaggedPostMenu = (props: Props) => {
  return (
    <MenuButton
      id="vert-menu"
      icon
      buttonChildren="more_vert"
      className="menu-post"
      tooltipLabel="Open post menu"
    >
      <ListItem primaryText={props.post.title} />
      <ListItem primaryText="Item Two" />
      <ListItem primaryText="Item Three" />
      <ListItem primaryText="Item Four" />
    </MenuButton>
  );
};

export default TaggedPostMenu;

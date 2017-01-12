/* @flow */
import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import Link from 'react-router/lib/Link';
import DocumentTextIcon from 'material-ui/svg-icons/av/library-books';
import SettingsIcon from 'material-ui/svg-icons/action/settings-applications';
import LinkIcon from 'material-ui/svg-icons/editor/insert-link';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import PageIcon from 'material-ui/svg-icons/communication/import-contacts';
import BlockIcon from 'material-ui/svg-icons/device/dvr';
import CloudIcon from 'material-ui/svg-icons/file/cloud-upload';
import HomeIcon from 'material-ui/svg-icons/action/home';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import PeopleIcon from 'material-ui/svg-icons/social/people';
import TemplateIcon from 'material-ui/svg-icons/av/web';
import ContentIcon from 'material-ui/svg-icons/content/content-copy';
import ListIcon from 'material-ui/svg-icons/action/list';
import { inlineStyles } from '../../../../theme/material';

type Props = {
  open: Boolean,
  onChangeList: Function,
};
const styles = {
  color: '#D5DADD',
};
const SelectableList = makeSelectable(List);
const Sidebar = (props: Props) => {
  return (
    <Drawer open={ props.open } width={ 200 } containerStyle={ inlineStyles.drawer }>
      <SelectableList value={ location.pathname } onChange={ props.onChangeList }>
        <ListItem leftIcon={ <HomeIcon color="D5DADD" /> } style={ styles } primaryText="Home" value="/" />
        <ListItem
          leftIcon={ <DashboardIcon color="D5DADD" /> }
          style={ styles } primaryText="Dashboard" value="/admin"
        />
        <ListItem
          primaryText="Posts"
          style={ styles }
          leftIcon={ <DocumentTextIcon color="D5DADD" /> }
          primaryTogglesNestedList
          nestedItems={ [
            <ListItem
              key={ 1 }
              primaryText="Post Listing"
              style={ styles }
              leftIcon={ <ListIcon color="D5DADD" /> }
              value="/admin/posts"
            />,
            <ListItem
              key={ 2 }
              primaryText="New Post"
              style={ styles }
              leftIcon={ <ContentIcon color="D5DADD" /> }
              value="/admin/posts/new"
            />,
          ] }
        />
        <ListItem
          leftIcon={ <TemplateIcon color="D5DADD" /> }
          style={ styles }
          primaryText="Tags"
          value="/admin/tags"
        />
        <ListItem
          leftIcon={ <CloudIcon color="D5DADD" /> }
          style={ styles }
          primaryText="File Manager"
          value="/admin/filemanager"
        />
        <ListItem
          leftIcon={ <LinkIcon color="D5DADD" /> }
          style={ styles }
          primaryText="Navigation"
          value="/admin/navigation"
        />
        <ListItem
          leftIcon={ <PeopleIcon color="D5DADD" /> }
          style={ styles }
          primaryText="Members"
          value="/admin/members"
        />
        <ListItem
          leftIcon={ <TemplateIcon color="D5DADD" /> }
          style={ styles }
          primaryText="Templates"
          value="/admin/templates"
        />
        </SelectableList>
    </Drawer>
  );
};

export default Sidebar;

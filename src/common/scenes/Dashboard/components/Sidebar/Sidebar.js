import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import Link from 'react-router/lib/Link';
import SettingsIcon from 'material-ui/svg-icons/action/settings-applications';
import LinkIcon from 'material-ui/svg-icons/editor/insert-link';
import PageIcon from 'material-ui/svg-icons/communication/import-contacts';
import BlockIcon from 'material-ui/svg-icons/device/dvr';
import CloudIcon from 'material-ui/svg-icons/file/cloud-upload';
import HomeIcon from 'material-ui/svg-icons/action/home';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import PeopleIcon from 'material-ui/svg-icons/social/people';
import ContentIcon from 'material-ui/svg-icons/content/content-copy';
import ListIcon from 'material-ui/svg-icons/action/list';

const Sidebar = (props) => {
  return (
    <Drawer open={ props.open } width={ 200 }>
      <AppBar title="Boldr" iconStyleLeft={ { display: 'none' } } />
      <Link to="/">
        <MenuItem leftIcon={ <HomeIcon /> }>Home</MenuItem>
      </Link>
      <Link to="/dashboard">
        <MenuItem leftIcon={ <DashboardIcon /> }>Dashboard</MenuItem>
      </Link>
      <Link to="/dashboard/members">
        <MenuItem leftIcon={ <PeopleIcon /> }>Members</MenuItem>
      </Link>
      <Link to="/dashboard/posts">
        <MenuItem leftIcon={ <ListIcon /> }>Post Listing</MenuItem>
      </Link>
      <Link to="/dashboard/posts/new">
        <MenuItem leftIcon={ <ContentIcon /> }>New Post</MenuItem>
      </Link>
      <Link to="/dashboard/filemanager">
        <MenuItem leftIcon={ <CloudIcon /> }>File Manager</MenuItem>
      </Link>
      <Link to="/dashboard/blocks">
        <MenuItem leftIcon={ <BlockIcon /> }>Blocks</MenuItem>
      </Link>
      <Link to="/dashboard/navigation">
        <MenuItem leftIcon={ <LinkIcon /> }>Navigation</MenuItem>
      </Link>
      <Link to="/dashboard/pages">
        <MenuItem leftIcon={ <PageIcon /> }>Pages</MenuItem>
      </Link>
      <Link to="/dashboard/settings">
        <MenuItem leftIcon={ <SettingsIcon /> }>Settings</MenuItem>
      </Link>
    </Drawer>
  );
};

export default Sidebar;

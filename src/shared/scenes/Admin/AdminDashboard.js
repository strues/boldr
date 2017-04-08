/* @flow */
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import NavLink from 'react-router-dom/NavLink';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Avatar, Button, Grid, Col, Row, FontIcon, DashboardFooter, Topbar, DashNav } from 'boldr-ui';

import renderRoutes from '../../core/addRoutes';

type Props = {
  children: any,
  dashboard: ?Object,
  me: Object,
  location: Object,
  ui: Object,
  route: Object,
  copyright: string,
};
const { SubMenu } = DashNav;
const MenuItemGroup = DashNav.ItemGroup;

export class AdminDashboard extends Component {
  state = {
    current: '1',
    openKeys: [],
  };
  props: Props;

  handleClick = e => {
    console.log('Clicked: ', e);
    this.setState({ current: e.key });
  };
  onOpenChange = openKeys => {
    const { state } = this;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  };
  getAncestorKeys = key => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  };
  render() {
    const { route } = this.props;
    return (
      <div className="boldrui-dashboard">
        <Topbar me={ this.props.me } logo="https://boldr.io/logo.png" />
        <div className="boldrui-dashboard-body">
          <DashNav
            mode="inline"
            openKeys={ this.state.openKeys }
            selectedKeys={ [this.state.current] }
            style={ { width: 240 } }
            onOpenChange={ this.onOpenChange }
            onClick={ this.handleClick }
          >
            <SubMenu key="sub1" title={ <span><FontIcon>list</FontIcon> <span>Content</span></span> }>
              <DashNav.Item key="1"><NavLink to="/admin/posts">List Posts</NavLink></DashNav.Item>
              <DashNav.Item key="2"><NavLink to="/admin/new-post">New Post</NavLink></DashNav.Item>
              <DashNav.Item key="3"><NavLink to="/admin/tags">View Tags</NavLink></DashNav.Item>
            </SubMenu>
            <SubMenu key="sub2" title={ <span><FontIcon>list</FontIcon> <span>Media</span></span> }>
              <DashNav.Item key="4"><NavLink to="/admin/filemanager">File Manager</NavLink></DashNav.Item>
            </SubMenu>
            <SubMenu key="sub3" title="Users">
              <DashNav.Item key="5"><NavLink to="/admin/members">Members List</NavLink></DashNav.Item>
            </SubMenu>
            <SubMenu key="sub4" title={ <span><FontIcon>list</FontIcon> <span>Layout</span></span> }>
              <DashNav.Item key="6"><NavLink to="/admin/navigation">Navigation Editor</NavLink></DashNav.Item>
            </SubMenu>
            <SubMenu key="sub5" title={ <span><FontIcon>list</FontIcon> <span>Site</span></span> }>
              <DashNav.Item key="7"><NavLink to="/admin/settings">Settings</NavLink></DashNav.Item>
            </SubMenu>
          </DashNav>
          <main className="main">
            <Grid fluid>
              {renderRoutes(route.routes)}
            </Grid>
          </main>
        </div>
        <DashboardFooter copyright="© 2017 Steven Truesdell" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activities: state.admin.dashboard.activities,
    stats: state.admin.dashboard.stats,
    loading: state.admin.dashboard.loading,
    dashboard: state.admin.dashboard,
    boldr: state.boldr,
    me: state.users.me,
    ui: state.boldr.ui,
  };
}

export default connect(mapStateToProps)(AdminDashboard);

/* @flow */
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import NavLink from 'react-router-dom/NavLink';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Avatar, Button, Grid, Col, Row, FontIcon, DashboardFooter, Sidebar, Topbar } from 'boldr-ui';
import { expandSideMenu, collapseSideMenu } from '../../state/modules/boldr/ui/actions';
import renderRoutes from '../../core/addRoutes';

type Props = {
  children: any,
  dashboard: ?Object,
  me: Object,
  location: Object,
  ui: Object,
  route: Object,
  copyright: string,
  dispatch: () => void,
};

export class AdminDashboard extends Component {
  props: Props;
  handleItemClick = () => {
    if (this.props.ui.expanded === true) {
      this.props.dispatch(collapseSideMenu());
    } else {
      this.props.dispatch(expandSideMenu());
    }
  };
  render() {
    const { route, me, location: { pathname, search } } = this.props;

    return (
      <div className="boldrui-dash-wrapper boldrui-dash-topbar__fixed boldrui-dash-sidebar-fixed">
        <Topbar username={ me.username } avatarUrl={ me.avatarUrl } />
        <div className="boldrui-dash-body">
          <Sidebar
            handleExpandClick={ this.handleItemClick }
            expanded={ this.props.ui.expanded }
            links={ [
              {
                text: 'Content',
                iconType: 'new-post',
                key: 0,
                id: 1,
                link: '/admin',
                links: [
                  {
                    text: 'New Post',
                    iconType: 'new-post',
                    key: 0,
                    id: 1,
                    exact: true,
                    link: '/new-post',
                  },
                  {
                    text: 'Post Listing',
                    iconType: 'posts',
                    key: 1,
                    id: 2,
                    exact: true,
                    link: '/posts',
                  },
                  {
                    text: 'Tags',
                    iconType: 'tags',
                    key: 2,
                    id: 5,
                    exact: true,
                    link: '/tags',
                  },
                ],
              },

              {
                text: 'File Manager',
                iconType: 'folder-upload',
                key: 3,
                id: 6,
                exact: true,
                link: '/admin/filemanager',
              },
              {
                text: 'Navigation Editor',
                iconType: 'routes',
                key: 4,
                id: 7,
                exact: true,
                link: '/admin/navigation',
              },
              {
                text: 'Members List',
                iconType: 'account-card',
                key: 5,
                id: 8,
                exact: true,
                link: '/admin/members',
              },
              {
                text: 'Site Settings',
                iconType: 'settings',
                key: 6,
                id: 9,
                exact: true,
                link: '/admin/settings',
              },
            ] }
          />
          <main className="boldrui-dash-main">
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

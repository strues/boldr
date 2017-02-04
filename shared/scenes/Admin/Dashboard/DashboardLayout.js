/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { ReactElement } from 'types/react';
import Avatar from 'react-md/lib/Avatars';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import { Grid, Col, Row } from '../../../components/index';
import navItems from './buildAdminNav';

const styled = require('styled-components').default;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 25px;
  box-sizing: border-box;
  margin-left: 15px;
  margin-right: 15px;
  max-width: 2000px;
`;
const UserSection = styled.div`
  display: inline-flex;
  flex-direction: row;
  vertical-align: middle;
  justify-content: center;
`;
const UserName = styled.div`
  padding-top: 10px;
  margin-left: 15px;
  margin-right: 50px;
  font-weight: 700;
`;
type Props = {
  children: ReactElement,
  dashboard: ?Object,
  account: Object,
  location: Object,
};

class DashboardLayout extends Component {
  constructor(props: Props) {
    super();
    this.state = {
      visible: true,
      position: 'left',
    };
    (this: any)._closeDrawer = this._closeDrawer.bind(this);
    (this: any)._handleToggle = this._handleToggle.bind(this);
  }
  props: Props;

  _handleToggle(visible) {
    this.setState({ visible });
  }

  _closeDrawer() {
    this.setState({ visible: false });
  }
  render() {
    const { location: { pathname, search } } = this.props;
    const toolbarActionItems = (
      <UserSection>
        <Avatar src={ this.props.account.user.avatarUrl } role="presentation" />
        <UserName>{ this.props.account.user.firstName }</UserName>
      </UserSection>
    );
    return (
        <NavigationDrawer
          visible
          drawerTitle="Boldr"
          drawerClassName="boldr-drawer__admin"
          desktopMinWidth={ 900 }

          onVisibilityToggle={ this._handleToggle }
          navItems={ navItems(pathname) }
          mobileType={ NavigationDrawer.DrawerTypes.TEMPORARY }
          desktopType={ NavigationDrawer.DrawerTypes.FULL_HEIGHT }
          toolbarActions={ toolbarActionItems }
        >
            <Wrapper>
              { this.props.children }
            </Wrapper>
        </NavigationDrawer>
    );
  }
}

function mapStateToProps(state) {
  return {
    router: state.router,
    dashboard: state.admin.dashboard,
    boldr: state.boldr,
    account: state.account,
  };
}

export default connect(mapStateToProps)(DashboardLayout);

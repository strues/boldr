/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { ReactElement } from 'types/react';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import { Grid, Col } from '../../../components/index';
import navItems from './buildAdminNav';

const styled = require('styled-components').default;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  box-sizing: border-box;
`;
type Props = {
  children: ReactElement,
  dashboard: ?Object,
  account: Object,
  location: Object,
};

class DashboardLayout extends Component {
  props: Props;
  render() {
    const { location: { pathname, search } } = this.props;
    return (
        <NavigationDrawer
          visible
          drawerTitle="Boldr"
          drawerClassName="boldr-drawer__admin"
          desktopMinWidth={ 900 }
          navItems={ navItems(pathname) }
          mobileType={ NavigationDrawer.DrawerTypes.TEMPORARY }
          desktopType={ NavigationDrawer.DrawerTypes.FULL_HEIGHT }
        >
          <Grid fluid>
            <Col xs>
              <Wrapper>
              { this.props.children }
            </Wrapper>
            </Col>
          </Grid>
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

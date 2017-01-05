/* eslint-disable no-unused-expressions */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { ReactElement } from 'types/react';
import AppBar from 'material-ui/AppBar';

import { Grid, Col, Authenticated } from '../../../components/index';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { showSidebar, hideSidebar } from './reducer';

const styled = require('styled-components').default;

const BgOffsetBlock = styled.div`
  display: flex;
  position: static;
  width: 100%;
  height: 225px;
  background-color: #01579b;
  z-index: 5;
  background-attachment: fixed;
`;
type Props = {
  children: ReactElement,
  toggleOpen?: Function,
  showSidebar?: Function,
  hideSidebar?: Function,
  dashboard: ?Object
};

@Authenticated
class DashboardContainer extends PureComponent {
  constructor() {
    super();
    this.state = { open: false };
    (this: any).menuButtonClick = this.menuButtonClick.bind(this);
    (this: any).onSetOpen = this.onSetOpen.bind(this);
    (this: any).onSetClose = this.onSetClose.bind(this);
  }
  props: Props;
  onSetOpen(open) {
    this.props.showSidebar();
  }
  onSetClose(open) {
    this.props.hideSidebar();
  }
  handleToggle = () => this.setState({ open: !this.state.open });
  menuButtonClick(ev) {
    ev.preventDefault();
    const isOpen = this.props.dashboard.open;
    isOpen ? this.onSetClose(this.state.open) : this.onSetOpen(this.state.open);
  }
  render() {
    return (
      <div>
        <Sidebar open={ this.props.dashboard.open } user={ this.props.account.user } />
        <Topbar
          title="Boldr"
          menuButtonClick={ this.menuButtonClick }
          open={ this.props.dashboard.open }
          user={ this.props.account.user }
        />

        <BgOffsetBlock />

        <Grid fluid style={ { paddingLeft: this.props.dashboard.open ? '200px' : '0px' } }>
          <Col xs>
            <div style={ { marginTop: '-135px', padding: '1.5em' } }>
              { this.props.children }
            </div>
          </Col>
      </Grid>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    router: state.router,
    dashboard: state.dashboard,
    boldr: state.boldr,
    account: state.account,
  };
}

export default connect(mapStateToProps, { showSidebar, hideSidebar })(DashboardContainer);

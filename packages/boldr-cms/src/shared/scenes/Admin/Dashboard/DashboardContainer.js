/* eslint-disable no-unused-expressions */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { ReactElement } from 'types/react';
import { push } from 'react-router-redux';
import AppBar from 'material-ui/AppBar';

import { Grid, Col, Authenticated } from '../../../components/index';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { showSidebar, hideSidebar } from '../../../state/modules/admin/dashboard/actions';

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
  dispatch?: Function,
  showSidebar?: Function,
  hideSidebar?: Function,
  dashboard: ?Object,
  account: Object,
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
    this.props.dispatch(showSidebar());
  }

  onSetClose(open) {
    this.props.dispatch(hideSidebar());
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  menuButtonClick(ev) {
    ev.preventDefault();
    const isOpen = this.props.dashboard.open;
    isOpen ? this.onSetClose(this.state.open) : this.onSetOpen(this.state.open);
  }

  handleChangeList = (event, value) => {
    this.props.dispatch(push(value));
  };
  render() {
    return (
      <div>
        <Topbar
          title="Boldr"
          menuButtonClick={ this.menuButtonClick }
          open={ this.props.dashboard.open }
          user={ this.props.account.user }
        />
        <Sidebar
          open={ this.props.dashboard.open }
          user={ this.props.account.user }
          onChangeList={ this.handleChangeList }
        />

        <Grid fluid style={ { paddingLeft: this.props.dashboard.open ? '200px' : '0px' } }>
          <Col xs>
            <div style={ { marginTop: '75px', padding: '1.5em' } }>
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
    dashboard: state.admin.dashboard,
    boldr: state.boldr,
    account: state.account,
  };
}

export default connect(mapStateToProps)(DashboardContainer);

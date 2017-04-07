/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { List, ListItem, Button, FontIcon, Paper, Row, Col, Modal } from 'boldr-ui';

import { showModal, hideModal } from '../../../state/modules/boldr/ui/actions';
import { updateMenuDetails, addMenuDetail, getByLabel } from '../../../state/modules/boldr/menu';
import NavigationEditor from './components/NavigationEditor';
import NavigationForm from './components/NavigationForm';

function mapStateToProps(state) {
  return {
    mainMenu: state.boldr.menu.main,
    ui: state.boldr.ui,
  };
}

type Props = {
  mainMenu: Object,
  ui: Object,
  dispatch?: Function,
  handleItemClick?: Function,
  updateMenuDetails: Function,
  addMenuDetail: Function,
  hideModal: Function,
  showModal: Function,
};

@connect(mapStateToProps, {
  updateMenuDetails,
  addMenuDetail,
  showModal,
  hideModal,
})
class Navigation extends Component {
  constructor() {
    super();
    (this: any).handleItemClick = this.handleItemClick.bind(this);
    (this: any).closeModal = this.closeModal.bind(this);
    (this: any).openModal = this.openModal.bind(this);
  }
  state: Object = {
    open: false,
    detail: {
      name: null,
      safe_name: null,
      order: null,
      href: null,
      mobile_href: null,
      uuid: null,
      has_dropdown: false,
      css_classname: null,
      id: null,
      icon: null,
      children: null,
    },
  };
  onUpdateFormSubmit = data => {
    this.props.updateMenuDetails(data);
  };

  onFormSubmit = values => {
    this.props.addMenuDetail(values);
  };
  closeModal() {
    this.props.hideModal();
  }
  openModal() {
    this.props.showModal();
  }

  props: Props;

  handleItemClick(item: Object) {
    this.setState({
      detail: {
        name: item.name,
        safe_name: item.safe_name,
        order: item.order,
        href: item.href,
        mobile_href: item.mobile_href,
        has_dropdown: item.has_dropdown,
        css_classname: item.css_classname,
        id: item.id,
        icon: item.icon,
        children: item.children,
      },
    });
  }

  render() {
    const { mainMenu } = this.props;
    const listItems = mainMenu.details.map((item, i) => {
      return <ListItem key={ item.id } primaryText={ item.name } onClick={ () => this.handleItemClick(item) } />;
    });

    return (
      <div>
        <Helmet title="Admin: Navigation" />
        <Row>
          <Col xs>
            <Paper zDepth={ 1 }>
              <List className="navigation__list">
                {listItems}
              </List>
            </Paper>
            <Button onClick={ this.openModal } icon>
              <FontIcon>add</FontIcon>
            </Button>
          </Col>
          <Col xs={ 12 } md={ 4 }>
            <Paper zDepth={ 2 } className="boldr-paperoverride">
              <NavigationEditor initialValues={ this.state.detail } onFormSubmit={ this.onUpdateFormSubmit } />
            </Paper>
          </Col>
        </Row>
        <Modal visible={ this.props.ui.modal } title="Add a link" onClose={ this.closeModal }>
          <NavigationForm onSubmit={ this.onFormSubmit } />
        </Modal>
      </div>
    );
  }
}

export default Navigation;

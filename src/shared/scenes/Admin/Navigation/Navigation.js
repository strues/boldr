/* @flow */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import IconButton from 'material-ui/IconButton';
import { FontIcon, Headline, Paper, Divider, Row, Col, Modal } from 'boldr-ui';

import NavigationEditor from './components/NavigationEditor';
import NavigationForm from './components/NavigationForm';

type Props = {
  mainMenu: Object,
  modal: boolean,
  dispatch?: Function,
  handleItemClick?: Function,
  updateMenuDetails: Function,
  addMenuDetail: Function,
  hideModal: Function,
  showModal: Function,
  siteName: Object,
};

class Navigation extends Component {
  state: Object = {
    open: false,
    detail: {
      name: null,
      safeName: null,
      order: null,
      href: null,
      mobileHref: null,
      uuid: null,
      hasDropdown: false,
      cssClassname: null,
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
  closeModal = () => {
    this.props.hideModal();
  };
  openModal = () => {
    this.props.showModal();
  };

  props: Props;

  handleItemClick = (item: Object) => {
    this.setState({
      detail: {
        name: item.name,
        safeName: item.safeName,
        order: item.order,
        href: item.href,
        mobileHref: item.mobileHref,
        hasDropdown: item.hasDropdown,
        cssClassname: item.cssClassname,
        id: item.id,
        icon: item.icon,
        children: item.children,
      },
    });
  };

  render() {
    const { mainMenu } = this.props;
    const listItems = mainMenu.details.map(item => {
      return (
        <ListItem
          key={item.id}
          primaryText={item.name}
          onTouchTap={() => this.handleItemClick(item)}
        />
      );
    });

    return (
      <div>
        <Helmet title="Admin: Navigation" />
        <Headline type="h1">
          Edit {this.props.siteName.value}'s navigation
        </Headline>
        <Divider style={{ marginBottom: '30px' }} />
        <Row>
          <Col xs>
            <Paper zDepth={1}>
              <Headline type="h3">For now only main nav</Headline>
            </Paper>
          </Col>
          <Col xs>
            <Paper zDepth={1}>
              <List className="navigation__list">
                {listItems}
              </List>
            </Paper>
            <IconButton onTouchTap={this.openModal}>
              <FontIcon>add</FontIcon>
            </IconButton>
          </Col>
          <Col xs={12} md={4}>
            <Paper zDepth={2}>
              <NavigationEditor
                initialValues={this.state.detail}
                onFormSubmit={this.onUpdateFormSubmit}
              />
            </Paper>
          </Col>
        </Row>
        <Modal
          visible={this.props.modal}
          title="Add a link"
          onClose={this.closeModal}
        >
          <NavigationForm onSubmit={this.onFormSubmit} />
        </Modal>
      </div>
    );
  }
}

export default Navigation;

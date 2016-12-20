/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import PlusIcon from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import { Row, Col, Modal } from 'components/index';
import { getByLabel } from 'state/selectors';
import { updateNavLinks, addNavLinks } from 'state/index';
import NavigationEditor from './components/NavigationEditor';
import NavigationForm from './components/NavigationForm';
import { showModal, hideModal } from 'state/dux/ui';

function mapStateToProps(state) {
  return { navigation: getByLabel(state, 'main'), ui: state.ui };
}

export type Props = {
  navigation: Object,
  dispatch?: Function,
  handleItemClick?: Function,
};

@connect(mapStateToProps, { updateNavLinks, addNavLinks, showModal, hideModal })
class Navigation extends Component {
  constructor() {
    super();
    (this: any).handleItemClick = this.handleItemClick.bind(this);
    (this: any).closeModal = this.closeModal.bind(this);
    (this: any).openModal = this.openModal.bind(this);
  }
  state: Object = {
    open: false,
    link: {
      name: null,
      position: null,
      href: null,
      id: null,
      icon: null,
    },
  };
  onUpdateFormSubmit = (data) => {
    this.props.updateNavLinks(data);
  }

  onFormSubmit = (data) => {
    this.props.addNavLinks(data);
  }
  closeModal() {
    this.props.hideModal();
  }
  openModal() {
    this.props.showModal();
  }

  props: Props;

  handleItemClick(item: Object) {
    this.setState({
      link: {
        name: item.name,
        position: item.position,
        href: item.href,
        id: item.id,
        icon: item.icon,
      },
    });
  }

  render() {
    const { navigation } = this.props;
    const listItems = navigation.links.map((item, i) => {
      return <ListItem key={ i } primaryText={ item.name } onClick={ () => this.handleItemClick(item) } />;
    });

    return (
      <div>
        <Row>
          <Col xs>
          <Paper zDepth={ 1 }>
            <List className="navigation__list">
              { listItems }
            </List>
          </Paper>
          <IconButton onClick={ this.openModal }>
            <PlusIcon />
          </IconButton>
          </Col>
          <Col xs={ 12 } md={ 4 }>
            <Paper zDepth={ 2 }>
              <NavigationEditor
                initialValues={ this.state.link }
                onFormSubmit={ this.onUpdateFormSubmit }
              />
            </Paper>
          </Col>
        </Row>
         <Modal
           open={ this.props.ui.modal }
           title="Add a link"
           onClose={ this.closeModal }
         >
           <NavigationForm onSubmit={ this.onFormSubmit } />
          </Modal>
      </div>
    );
  }
}

export default Navigation;

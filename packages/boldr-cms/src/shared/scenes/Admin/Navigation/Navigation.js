/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import PlusIcon from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import { Row, Col, Modal } from '../../../components/index';
import { showModal, hideModal } from '../../../state/modules/boldr/ui/actions';
import { updateMenuDetails, addMenuDetail, getByLabel } from '../../../state/modules/boldr/menu';
import NavigationEditor from './components/NavigationEditor';
import NavigationForm from './components/NavigationForm';


function mapStateToProps(state) {
  return { navigation: getByLabel(state, 'main'), ui: state.boldr.ui };
}

export type Props = {
  navigation: Object,
  dispatch?: Function,
  handleItemClick?: Function,
};

@connect(mapStateToProps, { updateMenuDetails, addMenuDetail, showModal, hideModal })
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
      position: null,
      link: null,
      id: null,
      icon: null,
    },
  };
  onUpdateFormSubmit = (data) => {
    this.props.updateMenuDetails(data);
  }

  onFormSubmit = (data) => {
    this.props.addMenuDetail(data);
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
      detail: {
        name: item.name,
        position: item.position,
        link: item.link,
        id: item.id,
        icon: item.icon,
      },
    });
  }

  render() {
    const { navigation } = this.props;
    const listItems = navigation.details.map((item, i) => {
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
                initialValues={ this.state.detail }
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

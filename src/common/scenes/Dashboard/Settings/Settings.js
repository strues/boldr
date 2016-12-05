import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Table, Segment } from 'semantic-ui-react';
import type { Setting } from 'types/models';
import { showModal, hideModal } from 'state/dux/ui';
import { Modal } from 'components/index';
import { SettingsItem, AddSettingForm } from './components';

type Props = {
  boldr?: Object,
  allSettings: Array<Setting>,
  dispatch: Function,
  updateBoldrSettings?: Function,
  ui: Object,
};

export class Settings extends Component {
  constructor() {
    super();

    this.state = {
      editing: false,
    };
  }
  props: Props;

  open = () => this.props.dispatch(showModal());
  close = () => this.props.dispatch(hideModal());

  render() {
    return (
      <Segment>
        <Table compact celled definition>
         <Table.Header>
           <Table.Row>
             <Table.HeaderCell>Key</Table.HeaderCell>
             <Table.HeaderCell>Value</Table.HeaderCell>
             <Table.HeaderCell>Description</Table.HeaderCell>
             <Table.HeaderCell>Action</Table.HeaderCell>
           </Table.Row>
         </Table.Header>

        <Table.Body>
           {
             this.props.allSettings.map(setting =>
               <SettingsItem key={ setting.id } setting={ setting } />,
             )
           }
        </Table.Body>

         <Table.Footer fullWidth>
           <Table.Row>
             <Table.HeaderCell />
             <Table.HeaderCell colSpan="4">
               <Button floated="right" icon labelPosition="left" primary size="small" onClick={ this.open }>
                 <Icon name="setting" /> Add Setting
               </Button>
             </Table.HeaderCell>
           </Table.Row>
         </Table.Footer>
       </Table>
       <Modal open={ this.props.ui.modal } onOpen={ this.open } onClose={ this.close } title="Add a setting">
         <AddSettingForm />
       </Modal>

      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
  };
};

export default connect(mapStateToProps)(Settings);

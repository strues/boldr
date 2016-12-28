import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import SettingIcon from 'material-ui/svg-icons/action/settings';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import type { Setting } from '../../../types/models';
import { showModal, hideModal } from '../../../state/modules/boldr/ui';
import { Modal } from '../../../components/index';
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
      <Paper zDepth={ 1 }>
        <Table compact celled definition>
         <TableHeader>
               <TableRow>
                 <TableHeaderColumn>Key</TableHeaderColumn>
                 <TableHeaderColumn>Value</TableHeaderColumn>
                 <TableHeaderColumn>Description</TableHeaderColumn>
                 <TableHeaderColumn>Action</TableHeaderColumn>

               </TableRow>
             </TableHeader>
        <TableBody>
           {
             this.props.allSettings.map(setting =>
               <SettingsItem key={ setting.id } setting={ setting } />,
             )
           }
        </TableBody>

         <TableFooter>
           <TableRow>
             <TableHeaderColumn />
             <TableHeaderColumn>
               <RaisedButton primary label="Add Setting" onClick={ this.open }>
                 <SettingIcon />
               </RaisedButton>
             </TableHeaderColumn>
           </TableRow>
         </TableFooter>
       </Table>
       <Modal open={ this.props.ui.modal } onOpen={ this.open } onClose={ this.close } title="Add a setting">
         <AddSettingForm />
       </Modal>

     </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ui: state.boldr.ui,
  };
};

export default connect(mapStateToProps)(Settings);

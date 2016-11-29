import React, { Component } from 'react';
import { Button, Icon, Table, Segment } from 'semantic-ui-react';
import type { Setting } from 'types/models';
import { SettingsItem } from './components';

type Props = {
  boldr?: Object,
  allSettings: Array<Setting>,
  updateBoldrSettings?: Function,
};


class Settings extends Component {
  constructor() {
    super();

    this.state = {
      editing: false,
    };
  }
  props: Props;
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
               <Button floated="right" icon labelPosition="left" primary size="small">
                 <Icon name="setting" /> Add Setting
               </Button>
             </Table.HeaderCell>
           </Table.Row>
         </Table.Footer>
       </Table>
      </Segment>
    );
  }
}

export default Settings;

import React, { Component } from 'react';
import { TableBody, TableRowColumn, TableRow } from 'material-ui/Table';
import { connect } from 'react-redux';
import { updateBoldrSettings } from 'state/index';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import type { Setting } from 'types/models';

type Props = {
  value: ?String,
  handleSubmit: ?Function,
  description: String,
  key: String,
  updateBoldrSettings: () => void,
  setting: Setting
};

export class SettingsItem extends Component {
  constructor() {
    super();
    this.state = {
      editing: false,
      serializedForm: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }
  props: Props;
  handleChange = (e, { value }) => this.setState({ value });

  toggleEdit() {
    this.setState({
      editing: true,
    });
  }

  handleSubmit = (e, serializedForm) => {
    e.preventDefault();
    this.setState({ serializedForm });
    // setting.key is used here instead of value. This is purely for aesthetics.
    // doing it this way we are able to see what the field is called for when we display it,
    // so long as its understood we are actually editing the value.
    const sf = serializedForm.value;
    const settingId = this.props.setting.id;
    const payload = {
      value: sf,
      id: settingId,
    };
    this.props.updateBoldrSettings(payload);
  }
  renderEditing() {
    return (
        <form onSubmit={ this.handleSubmit }>
          <TextField name="value" floatingLabelText={ this.props.setting.value } />
          <RaisedButton type="submit" label="Save" />
        </form>
    );
  }
  render() {
    return (
      <TableRow>
       <TableRowColumn>{ this.props.setting.key }</TableRowColumn>
       <TableRowColumn>
       {
         this.state.editing ?
         this.renderEditing() :
         this.props.setting.value
       }
       </TableRowColumn>
       <TableRowColumn>{ this.props.setting.description }</TableRowColumn>
       <TableRowColumn>
         <IconButton onClick={ this.toggleEdit }>
           <EditIcon />
         </IconButton>

       </TableRowColumn>
      </TableRow>
    );
  }
}

export default connect(null, { updateBoldrSettings })(SettingsItem);

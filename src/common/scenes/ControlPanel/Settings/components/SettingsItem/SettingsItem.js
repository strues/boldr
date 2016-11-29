import React, { Component } from 'react';
import { Button, Icon, Table, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { updateBoldrSettings } from 'state/index';
import type { Setting } from 'types/models';

type Props = {
  value: ?String,
  handleSubmit: ?Function,
  description: String,
  key: String,
  updateBoldrSettings: () => void,
  setting: Setting
};

class SettingsItem extends Component {
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
        <Form onSubmit={ this.handleSubmit }>
          <Form.Input name="value" placeholder={ this.props.setting.value } />
          <Button type="submit">Save</Button>
        </Form>
    );
  }
  render() {
    return (
      <Table.Row>
       <Table.Cell>{ this.props.setting.key }</Table.Cell>
       <Table.Cell>
       {
         this.state.editing ?
         this.renderEditing() :
         this.props.setting.value
       }
       </Table.Cell>
       <Table.Cell>{ this.props.setting.description }</Table.Cell>
       <Table.Cell>
         <Icon name="edit" onClick={ this.toggleEdit } />
       </Table.Cell>
      </Table.Row>
    );
  }
}

export default connect(null, { updateBoldrSettings })(SettingsItem);

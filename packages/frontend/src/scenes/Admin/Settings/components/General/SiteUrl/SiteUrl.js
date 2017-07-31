/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Button from '@@components/Button';

import { updateBoldrSettings } from '../../../../../../state/modules/boldr/settings';

type Props = {
  id: Number,
  value: any,
  focused: boolean,
  columnWidths: Number,
  dispatch: Function,
  handleChange: Function,
  handleSubmit: Function,
};
type State = {
  value: any,
};
class SiteUrl extends Component {
  state = { value: this.props.value };
  state: State;

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    const payload = {
      id: this.props.id,
      value: this.state.value,
    };

    this.props.dispatch(updateBoldrSettings(payload));
    event.preventDefault();
  };
  props: Props;
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          style={{ width: '400px' }}
          id="siteUrlInput"
          floatingLabelText="Web address"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <Button htmlType="submit" kind="primary" onClick={this.handleSubmit}>
          Save
        </Button>
      </form>
    );
  }
}

export default connect()(SiteUrl);

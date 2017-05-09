/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import {
  updateBoldrSettings,
} from '../../../../../../state/modules/boldr/settings';

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
class SiteName extends Component {
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
          id="siteNameInput"
          floatingLabelText="Website name"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <FlatButton onTouchTap={this.handleSubmit} label="Save" primary />
      </form>
    );
  }
}

export default connect()(SiteName);

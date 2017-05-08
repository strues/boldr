/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField } from 'boldr-ui';
import Button from 'boldr-ui/lib/components/Button';

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
class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };

    (this: any).handleChange = this.handleChange.bind(this);
    (this: any).handleSubmit = this.handleSubmit.bind(this);
  }
  state: State;
  handleChange(event) {
    this.setState({ value: event });
  }

  handleSubmit(event) {
    const payload = {
      id: this.props.id,
      value: this.state.value,
    };

    this.props.dispatch(updateBoldrSettings(payload));
    event.preventDefault();
  }
  props: Props;
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          style={{ width: '400px' }}
          id="floatingTitle"
          label="Logo"
          placeholder={this.state.value}
          value={this.state.value}
          onChange={this.handleChange}
        />
        <Button onClick={this.handleSubmit}>Save</Button>
      </form>
    );
  }
}

export default connect()(Logo);

/* @flow */
import React, { Component } from 'react';
import ExpansionPanel from 'react-md/lib/ExpansionPanels';
import { connect } from 'react-redux';
import TextField from 'react-md/lib/TextFields';
import { Row } from 'boldr-ui';
import { updateBoldrSettings } from '../../../../../state/modules/boldr/settings';

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
    this.setState({ value: event.target.value });
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
    const { focused } = this.props;
    const formVal = {
      value: this.props.value,
    };
    return (
      <ExpansionPanel
        focused={ focused }
        label="Logo"
        className="md-cell-md-cell--12"
        contentClassName="md-grid"
        onSave={ this.handleSubmit }
      >
        <Row>
          <form onSubmit={ this.handleSubmit }>
            <TextField
              style={ { width: '400px' } }
              id="floatingTitle"
              label="Logo"
              placeholder={ this.state.value }
              value={ this.state.value }
              onChange={ this.handleChange }
            />
          </form>
        </Row>
      </ExpansionPanel>
    );
  }
}

export default connect()(Logo);

// @flow
import * as React from 'react';
import Form, { FormField, Control, Input, Label } from '@boldr/ui/Form';

type Props = {
  id: number,
  value: any,
};
type State = {
  value: any,
};

class SettingForm extends React.Component<Props, State> {
  state = { value: this.props.value };
  props: Props;
  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    const payload = {
      id: this.props.id,
      value: this.state.value,
    };
    console.log(payload);
    // this.props.dispatch(updateBoldrSettings(payload));
    event.preventDefault();
  };

  render() {
    return (
      <Form>
        <FormField>
          <Label>
            {this.props.label}
          </Label>
          <Control>
            <Input
              type="text"
              placeholder="Text Input"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </Control>
        </FormField>
      </Form>
    );
  }
}
export default SettingForm;

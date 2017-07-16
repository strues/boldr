/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Button from '@boldr/ui/Button';
import { isEmail, isRequired } from '../../../../../../core/util/validations';

import {
  Checkbox,
  Control,
  Help,
  Input,
  Label,
  Radio,
  Select,
  TextArea,
  FormField,
  FieldBody,
  FieldLabel,
} from '../../../../../../components/FormNew';
import {
  ReduxFormInput,
  ReduxFormSelect,
  ReduxFormCheckbox,
  ReduxFormRadio,
} from '../../../../../../components/FormNew/FormHelpers';

const validate = values => {
  const errors = {};
  if (!values.siteName) {
    errors.siteName = 'Required';
  }
  if (!values.f) {
    errors.f = 'Required';
  }
  return errors;
};

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
const colors = [
  { value: 'red', text: 'Red' },
  { value: 'orange', text: 'Orange' },
  { value: 'yellow', text: 'Yellow' },
];
class SiteName extends Component {
  handleSubmit = event => {
    const payload = {
      id: this.props.id,
      value: this.state.value,
    };
    console.log(payload);
    // this.props.dispatch(updateBoldrSettings(payload));
    event.preventDefault();
  };
  props: Props;
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Field name="siteName" type="text" component={ReduxFormInput} label="Site Name" />
        <Field name="f" type="text" component={ReduxFormInput} label="Site Name" />
        <Field
          name="colrs"
          type="select"
          component={ReduxFormSelect}
          label="Colors"
          options={colors}
        />
        <Field
          name="employed"
          id="employed"
          component={ReduxFormCheckbox}
          type="checkbox"
          label="employed"
        />
        <Field
          name="colors"
          type="radio"
          value="hello"
          component={ReduxFormRadioGroup}
          label="Colors"
        />
        <FormField isGrouped>
          <Control>
            <Button kind="primary">Submit</Button>
          </Control>
          <Control>
            <Button kind="secondary">Cancel</Button>
          </Control>
        </FormField>
        <Button htmlType="submit" kind="primary" onClick={this.handleSubmit}>
          Save
        </Button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'siteName',
  validate,
})(SiteName);

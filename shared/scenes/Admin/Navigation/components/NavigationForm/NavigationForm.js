import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-md/lib/Buttons';
import TextField from '../../../../../components/Form/TextField';

type Props = {
  handleSubmit?: Function,
  reset?: Function,
  submitting?: boolean,
  fields?: Object,
  pristine?: boolean,
};

const style = {
  margin: 12,
};

let NavigationForm = (props: Props) => { // eslint-disable-line
  const { handleSubmit, reset } = props;
  return (
    <form className="form__navigation" onSubmit={ handleSubmit }>
      <Field id="nav-name" name="name" component={ TextField } type="text" label="Name" />
      <Field id="nav-position" name="position" component={ TextField } type="text" label="Position" />
      <Field id="nav-link" name="link" component={ TextField } type="text" label="Link" />
      <Field id="nav-icon" name="icon" component={ TextField } type="text" label="Icon" />
      <div className="form__footer">
        <Button type="submit" label="Save" style={ style } raised primary />
        <Button label="Reset" onClick={ reset } style={ style } raised secondary />
      </div>
    </form>
  );
};
NavigationForm = reduxForm({
  form: 'navigationForm',
})(NavigationForm);

export default NavigationForm;

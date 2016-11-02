import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import renderTextField from 'components/FormComponents/TextField';

export type Props = {
  handleSubmit?: Function,
  reset?: Function,
  submitting?: boolean,
  fields?: Object,
  pristine?: boolean,
};

let NavigationForm = (props: Props) => { // eslint-disable-line
  const { handleSubmit, reset } = props;
  return (
    <form className="form__navigation" onSubmit={ handleSubmit }>
      <Field name="name" component={ renderTextField } type="text" label="Name" />
      <Field name="position" component={ renderTextField } type="text" label="Position" />
      <Field name="href" component={ renderTextField } type="text" label="Link" />
      <Field name="icon" component={ renderTextField } type="text" label="Icon" />
      <div className="form__footer">
      <Button type="submit" primary style={ { marginRight: '10px' } }>Save</Button>
      <Button type="submit" onClick={ reset } style={ { marginRight: '10px' } }>Reset</Button>
      </div>
    </form>
  );
};
NavigationForm = reduxForm({
  form: 'navigationForm'
})(NavigationForm);

export default NavigationForm;

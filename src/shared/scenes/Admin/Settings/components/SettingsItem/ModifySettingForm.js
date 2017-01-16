import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'redux-form-material-ui';

type Props = {
  handleSubmit?: Function,
  reset?: Function,
  submitting?: boolean,
  fields?: Object,
  pristine?: boolean,
};

const ModifySettingForm = (props: Props) => {
  const { handleSubmit } = props;
  return (
      <form onSubmit={ handleSubmit } className="modal__form">
            <Field
              name="value"
              type="text"
              floatingLabelText={ props.label }
              component={ TextField }
            />
             <RaisedButton primary type="submit" label="Save changes" />
        </form>
  );
};

export default reduxForm({
  form: 'modifySettingForm',
})(ModifySettingForm);

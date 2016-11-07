/* @flow */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Form } from 'semantic-ui-react';
import { TextField, SelectField } from 'components/index';

type Props = {
  handleSubmit: () => void,
  reset: () => void,
}

const CreateBlockForm = (props: Props) => {
  const elements = ['Header', 'Footer', 'Navigation', 'Content'];

  const { handleSubmit, reset } = props;
  return (
      <Form onSubmit={ handleSubmit } className="modal__form">
            <Field
              name="name"
              type="text"
              label="Name"
              component={ TextField }
            />
            <Field
              name="label"
              type="text"
              label="Label"
              component={ TextField }
            />
            <Field
              name="element"
              type="text"
              label="Element"
              component={ SelectField }
              elements={ elements }
            />
             <Button primary type="submit">Save</Button>
             <Button onClick={ reset }>Clear</Button>

        </Form>
  );
};

export default reduxForm({
  form: 'createBlockform',
})(CreateBlockForm);

/* @flow */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
// internal
import Button from '@boldr/ui/Button';
import Form from '@boldr/ui/Form/Form';
import InputField from '@boldr/ui/Form/Fields/InputField';
import { formatReduxFormErrors } from '../../../../../../core/reduxFormErrors';

type Props = {
  addTagMutation: Function,
  handleSubmit?: Function,
  reset: ?Function,
  submitting?: boolean,
  fields?: Object,
  pristine?: boolean,
};

const style = {
  margin: 12,
};

class AddTag extends React.Component {
  addTagMutation = values => {
    const { addTagMutation } = this.props;

    return addTagMutation(values).catch(formatReduxFormErrors);
  };
  props: Props;
  render() {
    // eslint-disable-line
    const { handleSubmit, reset } = this.props;
    return (
      <Form className="boldr-form__addtag" onSubmit={handleSubmit(this.addTagMutation)}>
        <Field id="tag-name" name="name" component={InputField} type="text" label="Name" />
        <Field
          id="tag-description"
          name="description"
          component={InputField}
          type="text"
          label="Description"
        />

        <div className="form__footer">
          <Button type="submit" style={style}>Save</Button>
          <Button onClick={reset} style={style} theme="secondary">Reset</Button>
        </div>
      </Form>
    );
  }
}

export const ADD_TAG_MUTATION = gql`
  mutation addTag($input: TagInput!) {
    addTag(input: $input) {
      name
      description
    }
  }
`;

export default compose(
  graphql(ADD_TAG_MUTATION, {
    props: ({ mutate }) => ({
      addTagMutation: values => mutate({ variables: { input: values } }),
    }),
  }),
  reduxForm({
    form: 'addTagForm',
  }),
)(AddTag);

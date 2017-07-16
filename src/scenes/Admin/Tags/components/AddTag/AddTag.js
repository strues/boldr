/* @flow */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { graphql, compose } from 'react-apollo';
// internal
import Button from '@boldr/ui/Button';
import { Form, TextFormField } from '../../../../../components/Form';
import { formatReduxFormErrors } from '../../../../../core/reduxFormErrors';
import ADD_TAG_MUTATION from '../../gql/addTag.mutation.graphql';

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
        <Field id="tag-name" name="name" component={TextFormField} type="text" label="Name" />
        <Field
          id="tag-description"
          name="description"
          component={TextFormField}
          type="text"
          label="Description"
        />

        <div className="form__footer">
          <Button type="submit" style={style}>
            Save
          </Button>
          <Button onClick={reset} style={style} theme="secondary">
            Reset
          </Button>
        </div>
      </Form>
    );
  }
}

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

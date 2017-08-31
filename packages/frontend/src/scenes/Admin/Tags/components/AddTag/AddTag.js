/* @flow */
import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';
// internal
import Button from '@boldr/ui/Button';
import Heading from '@boldr/ui/Heading';
import { Control, FormField, Form, TextFormField } from '@boldr/ui/Form';
import { formatReduxFormErrors } from '../../../../../core/reduxFormErrors';
import ADD_TAG_MUTATION from '../../gql/addTag.mutation.graphql';
import TAGS_QUERY from '../../gql/tags.graphql';

export type Props = {
  addTagMutation: Function,
  handleSubmit: Function,
  reset?: Function,
  submitting?: boolean,
  pristine?: boolean,
};

const style = {
  margin: 12,
};

const TagFormPanel = styled.div`
  padding: 2em;
  margin: 0 auto;
`;

class AddTag extends React.Component<Props, *> {
  addTagMutation = values => {
    const { addTagMutation } = this.props;

    return addTagMutation(values).catch(formatReduxFormErrors);
  };
  props: Props;
  render() {
    // eslint-disable-line
    const { handleSubmit, reset, submitting, pristine } = this.props;
    return (
      <TagFormPanel>
        <Heading type="h3" text="Add a New Tag" />
        <Form className="boldr-form__addtag" onSubmit={handleSubmit(this.addTagMutation)}>
          <Field id="tag-name" name="name" component={TextFormField} type="text" label="Name" />
          <Field
            id="tag-description"
            name="description"
            component={TextFormField}
            type="text"
            label="Description"
          />
          <FormField isGrouped>
            <Control>
              <Button htmlType="submit" kind="primary" style={style} disabled={submitting}>
                Save
              </Button>
            </Control>
            <Control>
              <Button
                onClick={reset}
                style={style}
                kind="primary"
                disabled={submitting || pristine}
                outline>
                Reset
              </Button>
            </Control>
          </FormField>
        </Form>
      </TagFormPanel>
    );
  }
}

export default compose(
  // $FlowIssue
  graphql(ADD_TAG_MUTATION, {
    props: ({ mutate }) => ({
      addTagMutation: values =>
        mutate({
          variables: { input: values },
          // $FlowIssue
          refetchQueries: [
            {
              query: TAGS_QUERY,
              variables: {
                offset: 0,
                limit: 20,
              },
            },
          ],
        }),
    }),
  }),
  reduxForm({
    form: 'addTagForm',
  }),
)(AddTag);

/* @flow */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';
// internal
import Button from '@boldr/ui/Button';
import Headline from '@boldr/ui/Headline';
import { Control, FormField, Form, TextFormField } from '@boldr/ui/Form';
import { formatReduxFormErrors } from '../../../../../core/reduxFormErrors';
import ADD_TAG_MUTATION from '../../gql/addTag.mutation.graphql';
import TAGS_QUERY from '../../gql/tags.graphql';

export type Props = {
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

const TagFormPanel = styled.div`
  padding: 2em;
  margin: 0 auto;
`;

const SubTitle = styled.h3`
  font-size: 1.4em;
  font-weight: 300;
  font-family: Chivo;
  margin: 0;
`;

class AddTag extends Component {
  addTagMutation = values => {
    const { addTagMutation } = this.props;

    return addTagMutation(values).catch(formatReduxFormErrors);
  };
  props: Props;
  render() {
    // eslint-disable-line
    const { handleSubmit, reset } = this.props;
    return (
      <TagFormPanel>
        <Headline type="h3">Add a New Tag</Headline>
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
              <Button htmlType="submit" kind="primary" style={style}>
                Save
              </Button>
            </Control>
            <Control>
              <Button onClick={reset} style={style} kind="secondary">
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
  graphql(ADD_TAG_MUTATION, {
    props: ({ mutate }) => ({
      addTagMutation: values =>
        mutate({
          variables: { input: values },
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

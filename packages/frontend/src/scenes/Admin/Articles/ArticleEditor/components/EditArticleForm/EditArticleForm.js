/* @flow */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import Button from '@boldr/ui/Button';
import { Col, Row } from '@boldr/ui/Layout';
import Headline from '@boldr/ui/Headline';
import { FormGroup, Label, FormField, TextFormField, RadioFormField } from '@boldr/ui/Form';
import EditorField from './EditorField';

const Wrapper = styled.section`
  padding: 1em;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12),
    0 2px 4px -1px rgba(0, 0, 0, .4);
  background-color: #fff;
`;

type Props = {
  handleSubmit?: Function,
  reset?: Function,
  submitting?: boolean,
  fields?: Object,
  pristine?: boolean,
  input?: Object,
  label?: string,
  initialValues: Object,
};

const EditArticleForm = (props: Props) => {
  const { handleSubmit } = props;

  return (
    <Row>
      <Col xs>
        <Headline type="h3">
          Editing {props.initialValues.title}
        </Headline>
        <form onSubmit={handleSubmit}>
          <Wrapper>
            <FormGroup>
              <Field
                id="post-title"
                name="title"
                type="text"
                component={TextFormField}
                label="Post Title"
              />
            </FormGroup>
            <FormGroup>
              <Field
                id="featureimg"
                name="image"
                type="text"
                placeholder="URL for your image"
                component={TextFormField}
                label="Feature Image"
              />
            </FormGroup>
          </Wrapper>
          <Wrapper>
            <Field name="content" component={EditorField} />
          </Wrapper>
          <Wrapper>
            <FormGroup>
              <Field
                name="excerpt"
                id="post-excerpt"
                type="text"
                component={TextFormField}
                label="Excerpt"
              />
            </FormGroup>
            <FormGroup>
              <FormField isGrouped>
                <Label>Publishing status</Label>
                <Field
                  name="published"
                  type="radio"
                  value="draft"
                  component={RadioFormField}
                  label="Draft"
                />
                <Field
                  name="published"
                  type="radio"
                  value="published"
                  component={RadioFormField}
                  label="Published"
                />
              </FormField>
            </FormGroup>

            <Button htmlType="submit" kind="primary">
              Save Post
            </Button>
          </Wrapper>
        </form>
      </Col>
    </Row>
  );
};

export default reduxForm({
  form: 'editArticleForm',
})(EditArticleForm);

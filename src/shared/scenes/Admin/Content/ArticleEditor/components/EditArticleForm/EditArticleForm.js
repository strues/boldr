/* eslint-disable max-len */
/* @flow */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import { InputField, Col, Row, Headline, FormGroup } from 'boldr-ui';

import EditorField from './EditorField';

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
const Wrapper = styled.section`
  padding: 1em;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12), 0 2px 4px -1px rgba(0, 0, 0, .4);
  background-color: #fff;
`;
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
                component={InputField}
                label="Post Title"
              />
            </FormGroup>
            <FormGroup>
              <Field
                id="featureimg"
                name="feature_image"
                type="text"
                helpText="URL for your image"
                component={InputField}
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
                component={InputField}
                label="Excerpt"
              />
            </FormGroup>
            <FormGroup>
              <Headline type="h4">Post Status:</Headline>
              <label htmlFor="draft" style={{ marginRight: '10px' }}>
                <Field
                  id="draft"
                  name="published"
                  component="input"
                  type="radio"
                  value="false"
                />
                {' '}
                Draft
              </label>
              <label htmlFor="published">
                <Field
                  id="published"
                  name="published"
                  component="input"
                  type="radio"
                  value="true"
                />
                {' '}
                Publish
              </label>
            </FormGroup>

            <RaisedButton primary type="submit" label="Save Post" />
          </Wrapper>
        </form>
      </Col>
    </Row>
  );
};

export default reduxForm({
  form: 'editArticleForm',
})(EditArticleForm);

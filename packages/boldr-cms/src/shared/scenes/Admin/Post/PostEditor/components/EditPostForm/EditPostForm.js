import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-md/lib/Buttons/Button';
import FontIcon from 'react-md/lib/FontIcons';
import styled from 'styled-components';

import { InputField, Col, Row, Heading, FormGroup } from 'boldr-ui';
import { uploadPostImage } from '../../../../../../state/modules/attachments/actions';
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
const EditPostForm = (props: Props) => {
  const { handleSubmit } = props;
  /**
     * wraps the editor component for embedding into redux-form as an input component
     * @param  {object} input
     * @param  {string} label
     * @return {element} BoldrEditor
     */
  const renderEditor = ({ input, label }) => <EditorField { ...input } label={ label } />;

  return (
    <Row>
      <Col xs>
        <Heading size={ 3 } weight={ 300 }>Editing {props.initialValues.title}</Heading>
        <form onSubmit={ handleSubmit }>
          <Wrapper>
            <FormGroup>
              <Field id="post-title" name="title" type="text" component={ InputField } label="Post Title" />
            </FormGroup>
            <FormGroup>
              <Field
                id="featureimg"
                name="feature_image"
                type="text"
                helpText="URL for your image"
                component={ InputField }
                label="Feature Image"
              />
            </FormGroup>
          </Wrapper>
          <Wrapper>
            <Field name="content" component={ EditorField } />
          </Wrapper>
          <Wrapper>
            <FormGroup>
              <Field name="excerpt" id="post-excerpt" type="text" component={ InputField } label="Excerpt" />
            </FormGroup>
            <FormGroup>
              <Heading size={ 6 }>Post Status:</Heading>
              <label htmlFor="draft" style={ { marginRight: '10px' } }>
                <Field id="draft" name="published" component="input" type="radio" value="false" /> Draft
              </label>
              <label htmlFor="published">
                <Field id="published" name="published" component="input" type="radio" value="true" /> Publish
              </label>
            </FormGroup>

            <Button raised primary type="submit" label="Save Post" />
          </Wrapper>
        </form>
      </Col>
    </Row>
  );
};

export default reduxForm({
  form: 'editPostForm',
})(EditPostForm);

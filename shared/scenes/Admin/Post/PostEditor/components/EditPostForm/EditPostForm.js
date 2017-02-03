import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-md/lib/Buttons/Button';
import FontIcon from 'react-md/lib/FontIcons';
import { TextField, TextEditor, Col, Row, Heading, FormGroup } from '../../../../../../components';
import { uploadPostImage } from '../../../../../../state/modules/admin/attachments/actions';

type Props = {
  handleSubmit?: Function,
  reset?: Function,
  submitting?: boolean,
  fields?: Object,
  pristine?: boolean,
  input?: Object,
  label?: string,
};

const EditPostForm = (props: Props) => {
  const { handleSubmit } = props;
    /**
     * wraps the editor component for embedding into redux-form as an input component
     * @param  {object} input
     * @param  {string} label
     * @return {element} BoldrEditor
     */
  const renderEditor = ({ input, label }) => (<TextEditor { ...input } label={ label } />);

  return (
      <Row>
        <Col xs>
          <form onSubmit={ handleSubmit }>
            <FormGroup>
            <Field
              id="post-title"
              name="title"
              type="text"
              component={ TextField }
              label="Post Title"
            />
          </FormGroup>
            <FormGroup>
              <Field
                id="featureimg"
                name="feature_image"
                type="text"
                helpText="URL for your image"
                component={ TextField }
                label="Feature Image"
              />
            </FormGroup>

          <Field name="content" component={ renderEditor } />
          <FormGroup>
            <Field
              name="excerpt"
              id="post-excerpt"
              type="text"
              component={ TextField }
              label="Excerpt"

            />
          </FormGroup>
          <FormGroup>
            <Heading size={ 6 }>Post Status:</Heading>
            <label style={ { marginRight: '10px' } }>
              <Field id="draft" name="published" component="input" type="radio" value="false" /> Draft</label>
            <label>
              <Field id="published" name="published" component="input" type="radio" value="true" /> Publish
            </label>
          </FormGroup>

        <Button raised primary type="submit" label="Save Post" />
        </form>
        </Col>
      </Row>
  );
};

export default reduxForm({
  form: 'editPostForm',
})(EditPostForm);

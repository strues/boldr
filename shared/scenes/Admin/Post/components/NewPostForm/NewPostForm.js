import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import Button from 'react-md/lib/Buttons/Button';
import Dropzone from 'react-dropzone';

import TextField from '../../../../../components/Form/TextField';
import { TextEditor } from '../../../../../components/TextEditor';
import { Col, Row, Heading, FormGroup } from '../../../../../components/index';
import { uploadPostImage } from '../../../../../state/modules/admin/attachments/actions';

type Props = {
  handleSubmit?: Function,
  reset?: Function,
  submitting?: boolean,
  fields?: Object,
  dispatch: Function,
  pristine?: boolean,
  input?: Object,
  label?: string,
};

@connect()
class NewPostForm extends Component {
  constructor(props) {
    super();

    this.state = {
      files: [],
    };

    this.onDrop = this.onDrop.bind(this);
    this.onOpenClick = this.onOpenClick.bind(this);
  }

  props: Props;
  onDrop(files) {
    this.setState({
      file: files[0],
    });
    const payload = files[0];
    this.props.dispatch(uploadPostImage(payload));
  }
  onOpenClick() {
    this.dropzone.open();
  }

  render() {
    const { handleSubmit } = this.props;
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
            <Field name="tags" type="text"
              id="post-tags"
              helpText="Separate using commas"
              component={ TextField }
              label="Tags"
            />
          </FormGroup>
            <FormGroup>
            <Heading size={ 5 }>Upload a feature image</Heading>

            <Dropzone
              className="boldr-dropzone"
              ref={ (node) => { this.dropzone = node; } }
              multiple={ false }
              onDrop={ this.onDrop }
              accept="image/*"
              maxSize={ 5242880 }
            >
              <p className="boldr-dropzone__drop-sm">Drop an image here or select one from your computer. <br />
              It will upload right away.</p>
            </Dropzone>
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
  }
}

export default reduxForm({
  form: 'newPostForm',
})(NewPostForm);

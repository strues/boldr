import React, { Component } from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import Button from 'react-md/lib/Buttons/Button';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import { TextField, Col, Row, Heading, FormGroup } from '../../../../../../components';
import { uploadPostImage } from '../../../../../../state/modules/admin/attachments/actions';
import RenderTags from '../RenderTags';
import FieldEditor from './FieldEditor';

const Wrapper = styled.section`
  padding: 1em;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12), 0 2px 4px -1px rgba(0, 0, 0, .4);
  background-color: #fff;
`;
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
    return (
      <Row>
        <Col xs>
          <Heading size={ 3 } weight={ 300 }>Create a new post</Heading>
          <form onSubmit={ handleSubmit }>
            <Wrapper>
              <FormGroup>
                <Field
                  id="post-title"
                  name="title"
                  type="text"
                  component={ TextField }
                  label="Post Title"
                  tabIndex={ 0 }
                />
              </FormGroup>
              <FormGroup>
                <Heading size={ 5 }>Tags:</Heading>
                <FieldArray
                  name="tags"
                  type="text"
                  id="post-tags"
                  component={ RenderTags }
                  label="Tags"
                  tabIndex={ 1 }
                />
              </FormGroup>
            </Wrapper>
            <FormGroup>
              <Heading size={ 5 } top="2rem" bottom="2rem">Upload a feature image</Heading>

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
            <Wrapper>
              <Field component={ FieldEditor } label="Content" name="content" tabIndex={ 2 } />
            </Wrapper>
            <Wrapper>
              <FormGroup>
                <Field
                  name="excerpt"
                  id="post-excerpt"
                  type="text"
                  component={ TextField }
                  label="Excerpt"
                  tabIndex={ 3 }

                />
              </FormGroup>

              <FormGroup>
                <Heading size={ 5 }>Status:</Heading>
                <label style={ { marginRight: '10px' } }>
                  <Field id="draft" name="published" component="input" type="radio" value="false" /> Draft</label>
                <label>
                  <Field id="published" name="published" component="input" type="radio" value="true" /> Publish
                </label>
              </FormGroup>

              <Button raised primary type="submit" label="Save Post" />
            </Wrapper>
          </form>
        </Col>
      </Row>
    );
  }
}

export default reduxForm({
  form: 'newPostForm',
})(NewPostForm);

/* @flow */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import EditorState from 'draft-js/lib/EditorState';
import Dropzone from 'react-dropzone';
import Button from 'boldr-ui/lib/components/Button';
import { RadioButton } from 'material-ui/RadioButton';
import {
  InputField,
  Col,
  Paper,
  Row,
  FontIcon,
  Headline,
  Paragraph,
  Label,
  Block,
  RadioButtonGroup,
  FormGroup,
  Form,
} from 'boldr-ui';

import { isRequired } from '../../../../../../core/validations';
import RenderTags from '../RenderTags';
import FieldEditor from './FieldEditor';
import { Inner, Toolbar, NewPost, DarkSegment, HelpTxt } from './NewPostStyled';

type Props = {
  handleSubmit?: Function,
  reset?: Function,
  submitting?: boolean,
  fields?: Object,
  dispatch: Function,
  pristine?: boolean,
  input?: Object,
  label?: string,
  uploadImageForArticle: Function,
};

class NewArticleForm extends Component {
  state = {
    files: [],
    editorState: EditorState.createEmpty(),
  };

  props: Props;

  onDrop = files => {
    this.setState({
      file: files[0],
    });
    const payload = files[0];
    this.props.uploadImageForArticle(payload);
  };
  onOpenClick = () => {
    this.dropzone.open();
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <Headline type="h1">Create a new post</Headline>
        <NewPost>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Paper zDepth={1}>
                  <Toolbar>Content</Toolbar>
                  <Inner>
                    <Field
                      id="post-title"
                      name="title"
                      type="text"
                      placeholder="A title for the post"
                      component={InputField}
                      label="Post title"
                      tabIndex={0}
                      validate={[isRequired]}
                    />
                    <Label label="Post content body" />
                    <Field
                      component={FieldEditor}
                      label="Content"
                      name="content"
                      tabIndex={-2}
                      validate={[isRequired]}
                    />
                  </Inner>
                </Paper>
              </Col>
              <Col xs={12} md={4}>
                <DarkSegment>
                  <Headline lightText type="h3">Content Tags</Headline>
                  <HelpTxt>*Hit enter to save a tag</HelpTxt>
                  <Field
                    name="tags"
                    type="checkbox"
                    component={RenderTags}
                    label="Tags"
                    validate={[isRequired]}
                  />
                </DarkSegment>
                <Block>
                  <FormGroup>
                    <Headline type="h3">
                      Upload a feature image <FontIcon>photo_library</FontIcon>
                    </Headline>
                    <Dropzone
                      className="boldr-dropzone"
                      ref={node => {
                        this.dropzone = node;
                      }}
                      multiple={false}
                      onDrop={this.onDrop}
                      accept="image/*"
                      maxSize={5242880}
                    >
                      <Paragraph className="boldr-dropzone__drop-sm">
                        Drop an image here or click to select one from your computer.
                        <br />
                        It will upload right away.
                      </Paragraph>
                    </Dropzone>
                  </FormGroup>
                </Block>
                <FormGroup>
                  <Field
                    name="excerpt"
                    id="post-excerpt"
                    type="text"
                    label="Excerpt"
                    component={InputField}
                    placeholder="Short excerpt about the article"
                    tabIndex={-3}
                    validate={[isRequired]}
                  />
                </FormGroup>
                <Block>
                  <FormGroup>
                    <Label label="Publishing status" required />
                    <Field
                      name="published"
                      component={RadioButtonGroup}
                      validate={[isRequired]}
                    >
                      <RadioButton value="true" label="Published" />
                      <RadioButton value="false" label="Draft" />
                    </Field>
                  </FormGroup>

                  <Button type="submit">Save Post</Button>
                </Block>
              </Col>
            </Row>

          </Form>
        </NewPost>
      </div>
    );
  }
}

export default reduxForm({
  form: 'newArticleForm',
})(NewArticleForm);

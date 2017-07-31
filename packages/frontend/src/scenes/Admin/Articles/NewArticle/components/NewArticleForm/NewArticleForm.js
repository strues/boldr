/* @flow */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import EditorState from 'draft-js/lib/EditorState';
import Button from '@boldr/ui/Button';
import { Col, Row } from '@boldr/ui/Layout';
import Paper from '@boldr/ui/Paper';
import Headline from '@boldr/ui/Headline';
import Block from '@boldr/ui/Block';
import Form, { Label, FormGroup, FormField, TextFormField, RadioFormField } from '@boldr/ui/Form';
import { isRequired } from '../../../../../../core/util/validations';

import { setMedia } from '../../../../state/media/actions';
import RenderTags from '../RenderTags';
import FieldEditor from './FieldEditor';
import { Inner, Toolbar, NewPost, DarkSegment, HelpTxt } from './NewPostStyled';
// import UploadArticleImage from './UploadArticleImage';

export type Props = {
  handleSubmit?: Function,
  reset?: Function,
  submitting?: boolean,
  fields?: Object,
  dispatch: Function,
  pristine?: boolean,
  input?: Object,
  label?: string,
};

class NewArticleForm extends Component {
  state = {
    files: [],
    editorState: EditorState.createEmpty(),
  };

  props: Props;
  handleSetMedia = data => {
    this.props.dispatch(setMedia(data));
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
                      component={TextFormField}
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
                  <Headline lightText type="h3">
                    Content Tags
                  </Headline>
                  <HelpTxt>*Hit enter to save a tag</HelpTxt>
                  <Field
                    name="tags"
                    type="checkbox"
                    component={RenderTags}
                    label="Tags"
                    validate={[isRequired]}
                  />
                </DarkSegment>

                <FormGroup>
                  <Field
                    name="excerpt"
                    id="post-excerpt"
                    type="text"
                    label="Excerpt"
                    component={TextFormField}
                    placeholder="Short excerpt about the article"
                    tabIndex={-3}
                    validate={[isRequired]}
                  />
                </FormGroup>
                <Block>
                  <FormGroup>
                    <FormField isGrouped>
                      <Label>Article status:</Label>
                      <Field
                        name="published"
                        type="radio"
                        value="draft"
                        component={RadioFormField}
                        validate={[isRequired]}
                        label="Draft"
                      />
                      <Field
                        name="published"
                        type="radio"
                        value="published"
                        component={RadioFormField}
                        validate={[isRequired]}
                        label="Published"
                      />
                    </FormField>
                  </FormGroup>

                  <Button htmlType="submit" kind="primary">
                    Save Post
                  </Button>
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

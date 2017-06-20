/* @flow */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import EditorState from 'draft-js/lib/EditorState';
// import Radio from 'material-ui/Radio';
import Button from '@@components/Button';

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
  RadioField,
  // RadioButtonGroup,
  FormGroup,
  Form,
} from '@@components';

import { isRequired } from '@@core/validations';
import Radio from '@@components/Radio/Radio';
import RadioGroup from '@@components/Radio/RadioGroup';
import { setMedia } from '../../../../state/media/actions';
import RenderTags from '../RenderTags';
import FieldEditor from './FieldEditor';
import { Inner, Toolbar, NewPost, DarkSegment, HelpTxt } from './NewPostStyled';
import UploadArticleImage from './UploadArticleImage';

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

const radioOpts = [{ value: 'draft', text: 'Draft' }, { value: 'published', text: 'Published' }];

@connect()
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
                    <UploadArticleImage handleSetMedia={this.handleSetMedia} />

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
                      component={RadioField}
                      validate={[isRequired]}
                      options={radioOpts}
                    />
                  </FormGroup>

                  <Button htmlType="submit" kind="primary">Save Post</Button>
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

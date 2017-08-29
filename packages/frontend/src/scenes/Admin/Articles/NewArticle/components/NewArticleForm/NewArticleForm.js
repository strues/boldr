/* eslint-disable react/prefer-stateless-function */
/* @flow */
import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Button from '@boldr/ui/Button';
import { Col, Row } from '@boldr/ui/Layout';
import Paper from '@boldr/ui/Paper';
import Headline from '@boldr/ui/Headline';
import Block from '@boldr/ui/Block';
import Form, { Label, FormGroup, FormField, TextFormField, RadioFormField } from '@boldr/ui/Form';
import { isRequired } from '../../../../../../core/util/validations';
import RenderTags from '../RenderTags';
import type { RouterLocation } from '../../../../../../types/boldr';
import { selectArticleFormValues } from '../../../../state/selectors/articleSelectors';
import FieldEditor from './FieldEditor';
import { Inner, Toolbar, NewPost, DarkSegment, HelpTxt } from './NewPostStyled';

export type Props = {
  handleSubmit: Function,
  reset: () => void,
  submitting: boolean,
  location: RouterLocation,
  pristine: boolean,
};

class NewArticleForm extends React.Component<Props, *> {
  props: Props;
  render() {
    const { handleSubmit, location, reset, pristine, submitting } = this.props;
    // let isEditForm;

    // if (location && location.pathname.includes('edit')) {
    //   isEditForm = true;
    // } else {
    //   isEditForm = false;
    // }
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
                      name="rawContent"
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

                  <Button htmlType="submit" disabled={submitting} kind="primary">
                    Save Post
                  </Button>
                  <Button onClick={reset} kind="primary" disabled={submitting || pristine} outline>
                    Reset
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

const mapStateToProps = state => ({
  formValues: selectArticleFormValues(state),
});

let initStateForm = reduxForm({
  form: 'articleForm',
  enableReinitialize: true,
})(NewArticleForm);

export default connect(mapStateToProps)(initStateForm);

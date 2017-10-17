/* eslint-disable react/prefer-stateless-function */
/* @flow */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Button from '@boldr/ui/Button';
import { Col, Row } from '@boldr/ui/Layout';
import Paper from '@boldr/ui/Paper';
import Heading from '@boldr/ui/Heading';
import Form, {
  Label,
  FormGroup,
  FormField,
  TextFormField,
  TextAreaFormField,
  RadioFormField,
  SelectFormField,
} from '@boldr/ui/Form';
import { isRequired } from '../../../../../../core/util/validations';
import type { RouterLocation, CategoriesType } from '../../../../../../types/boldr';
import { selectArticleFormValues } from '../../../../state/selectors/articleSelectors';
import RenderTags from '../RenderTags';
import FieldEditor from './FieldEditor';
import { Inner, Toolbar, NewPost, DarkSegment, HelpTxt } from './NewPostStyled';

export type Props = {
  handleSubmit: Function,
  reset: () => void,
  submitting: boolean,
  location: RouterLocation,
  pristine: boolean,
  categories: CategoriesType,
};

class NewArticleForm extends React.Component<Props, *> {
  props: Props;
  render() {
    const { handleSubmit, location, categories, reset, pristine, submitting } = this.props;
    const catOpts = categories.map(category => {
      return {
        value: category.id,
        text: category.name,
      };
    });
    const opts = [{ value: '', text: 'Select a Category' }, ...catOpts];
    return (
      <div>
        <NewPost>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Paper zDepth={1}>
                  <Toolbar>New Article</Toolbar>
                  <Inner>
                    <Field
                      id="post-title"
                      name="title"
                      type="text"
                      placeholder="A title for the post"
                      component={TextFormField}
                      label="Title"
                      tabIndex={0}
                      validate={[isRequired]}
                    />
                    <Label>Content</Label>
                    <Field
                      component={FieldEditor}
                      name="rawContent"
                      tabIndex={-2}
                      validate={[isRequired]}
                    />
                  </Inner>
                </Paper>
              </Col>
              <Col xs={12} md={4}>
                <DarkSegment>
                  <Heading type="h4" text="Tags" isLight />

                  <HelpTxt>*Enter or Tab to save a tag</HelpTxt>
                  <Field
                    name="tags"
                    type="checkbox"
                    component={RenderTags}
                    label="Tags"
                    validate={[isRequired]}
                  />
                </DarkSegment>
                <Field
                  id="category"
                  name="categoryId"
                  type="select"
                  component={SelectFormField}
                  label="Category"
                  options={opts}
                />
                <FormGroup>
                  <Field
                    name="excerpt"
                    id="post-excerpt"
                    type="text"
                    label="Excerpt"
                    component={TextAreaFormField}
                    placeholder="Short description or summary."
                    tabIndex={-3}
                    validate={[isRequired]}
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    id="featureimg"
                    name="image"
                    type="text"
                    placeholder="https://boldr.io/image.png"
                    component={TextFormField}
                    label="Feature Image"
                  />
                </FormGroup>
                <FormGroup>
                  <FormField isGrouped>
                    <Label>Status:</Label>
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

const initStateForm = reduxForm({
  form: 'articleForm',
  enableReinitialize: true,
})(NewArticleForm);

export default connect(mapStateToProps)(initStateForm);

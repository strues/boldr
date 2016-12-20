import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  RadioButtonGroup,
  TextField,
} from 'redux-form-material-ui';
import { RadioButton } from 'material-ui/RadioButton';
import { Form, Segment } from 'semantic-ui-react';
import { Col, Row, Button } from 'components/index';
import { BoldrEditor } from 'boldr-editor';

import '../../../../../../../node_modules/boldr-editor/dist/boldreditor.css';

export type Props = {
  handleSubmit?: Function,
  editing?: boolean,
  reset?: Function,
  isEditing?: boolean,
  submitting?: boolean,
  fields?: Object,
  pristine?: boolean,
  input?: Object,
  label?: string,
};

class PostEditorForm extends Component {
  constructor(props: Props) {
    super();
    this.checkEditStatus = this.checkEditStatus.bind(this);
    this.state = {
      edit: false,
    };
  }
  props: Props;
  componentDidMount() {
    this.checkEditStatus();
  }
  checkEditStatus() {
    const EDITING = this.props.isEditing === true;
    if (EDITING) this.setState({ edit: true });
  }

  render() {
    const { handleSubmit } = this.props;


    /**
     * wraps the editor component for embedding into redux-form as an input component
     * @param  {object} input
     * @param  {string} label
     * @return {element} BoldrEditor
     */
    const renderEditor = ({ input, label }) => (
      <div>
        <BoldrEditor { ...input } label={ label } />
      </div>
    );

    return (
      <Row>
        <Col xs>
          <form onSubmit={ handleSubmit }>
            <Row>
              <Field name="title" type="text" component={ TextField } floatingLabelText="Post Title" />
            </Row>
                {
                  !this.state.edit ?
                    <Row><Field name="tags" type="text"
                      hintText="Separate using commas"
                      component={ TextField }
                      floatingLabelText="Tags"
                    /></Row> :
                  null
                }
                <Row>
                <Field name="feature_image" type="text"
                  hintText="URL for your image"
                  component={ TextField }
                  floatingLabelText="Feature Image"
                />
              </Row>
              <Row>
              <Field name="excerpt"
                type="text"
                component={ TextField }
                floatingLabelText="Excerpt"
                hintText="A brief overview or area from your post to highlight"
                multiLine
                fullWidth
                rows={ 3 }
              />
            </Row>
                <Field name="content" component={ renderEditor } />
              <Row>
                <Col xs={ 12 } md={ 6 }>
                  <Button type="submit" submit>Save Post</Button>
                </Col>
                <Col xs={ 12 } md={ 6 }>
                  <Field name="status" component={ RadioButtonGroup }>
                   <RadioButton value="draft" label="Draft" />
                   <RadioButton value="published" label="Published" />
                   <RadioButton value="archived" label="Archived" />
                 </Field>
                </Col>
              </Row>
          </form>
        </Col>
      </Row>
    );
  }
}
export default reduxForm({
  form: 'postEditorForm',
})(PostEditorForm);

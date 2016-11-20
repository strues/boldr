import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Button, Segment } from 'semantic-ui-react';
import { Col, Row } from 'components/index';
import { BoldrEditor } from 'boldr-editor';
import renderTextField from 'components/FormComponents/TextField';
import '../../../../../../../../node_modules/boldr-editor/dist/boldreditor.css';

class EditorForm extends Component {
  constructor(props) {
    super();
    this.checkEditStatus = this.checkEditStatus.bind(this);
    this.state = {
      edit: false,
    };
  }
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
          <Form onSubmit={ handleSubmit }>
            <Segment style={ { padding: '1em' } }>
              <Field name="title" type="text" component={ renderTextField } label="Post Title" />
              <Form.Group widths="equal">
                {
                  !this.state.edit ?
                    <Field name="tags" type="text"
                      helpText="Separate using commas"
                      component={ renderTextField }
                      label="Tags"
                    /> :
                  null
                }
                <Field name="feature_image" type="text"
                  helpText="URL for your image"
                  component={ renderTextField }
                  label="Feature Image"
                />
              </Form.Group>
              <Field name="excerpt"
                type="text"
                component={ renderTextField }
                label="Excerpt"
              />
              <div style={ { marginTop: '50px' } }>
                <Field name="content" component={ renderEditor } />
              </div>
              <Row>
                <Col xs={ 12 } md={ 6 }>
                  <Button type="submit" primary style={ { marginTop: '20px' } }>Save Post</Button>
                </Col>
                <Col xs={ 12 } md={ 6 }>
                  <div>
                    <label className="radio-inline__label">
                      <Field className="radio-inline__input"
                        name="status"
                        component="input"
                        type="radio"
                        value="draft"
                      />
                      Draft
                    </label>
                    <label className="radio-inline__label">
                      <Field className="radio-inline__input"
                        name="status"
                        component="input"
                        type="radio"
                        value="published"
                      />
                      Published
                    </label>
                 </div>
                </Col>
              </Row>
            </Segment>
          </Form>
        </Col>
      </Row>
    );
  }
}
export default reduxForm({
  form: 'EditorForm',
})(EditorForm);

EditorForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  editing: PropTypes.bool,
  reset: PropTypes.func,
  isEditing: PropTypes.bool,
  submitting: PropTypes.bool,
  fields: PropTypes.object,
  pristine: PropTypes.bool,
  input: PropTypes.object,
  label: PropTypes.string,
};

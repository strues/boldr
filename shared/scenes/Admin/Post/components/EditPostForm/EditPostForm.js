import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import Drawer from 'react-md/lib/Drawers';
import Button from 'react-md/lib/Buttons/Button';
import Toolbar from 'react-md/lib/Toolbars';
import FontIcon from 'react-md/lib/FontIcons';
import Subheader from 'react-md/lib/Subheaders';
import TextField from '../../../../../components/Form/TextField';
import { TextEditor } from '../../../../../components/TextEditor';
import { Col, Row, Heading, S3Uploader } from '../../../../../components/index';
import { uploadPostImage } from '../../../../../state/modules/admin/attachments/actions';

const styled = require('styled-components').default;

const Wrapper = styled.div`
  margin: 0 auto;
  display: inherit;
  padding-top: 3em;
  width: 90%;
`;
const Footer = styled.div`
  margin: 0 auto;
  display: inherit;
  width: 90%;
  padding-top: 5em;
`;

type Props = {
  handleSubmit?: Function,
  editing?: boolean,
  reset?: Function,
  isEditing?: boolean,
  submitting?: boolean,
  fields?: Object,
  dispatch: Function,
  pristine?: boolean,
  input?: Object,
  drawer: boolean,
  label?: string,
};
const fab = {
  float: 'right',
  marginTop: '10px',
  zIndex: '1000',
};

@connect()
class EditPostForm extends Component {
  constructor(props: Props) {
    super();
    this.state = {
      visible: false,
      position: 'right',
    };
    (this: any)._toggleRight = this._toggleRight.bind(this);
    (this: any)._closeDrawer = this._closeDrawer.bind(this);
    (this: any)._handleToggle = this._handleToggle.bind(this);
  }

  props: Props;

  onUploadFinish = (signResult) => {
    const signUrl = signResult.signedUrl;
    const splitUrl = signUrl.split('?');
    const fileUrl = splitUrl[0];

    const payload = {
      file_name: signResult.file_name,
      original_name: signResult.original_name,
      file_type: signResult.file_type,
      s3_key: signResult.s3_key,
      url: fileUrl,
    };
    this.props.dispatch(uploadPostImage(payload));
  }

  _handleToggle(visible) {
    this.setState({ visible });
  }

  _closeDrawer() {
    this.setState({ visible: false });
  }

  _toggleRight() {
    this.setState({ visible: !this.state.visible, position: 'right' });
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
    const close = <Button icon onClick={ this._closeDrawer }>close</Button>;
    const header = (
      <Toolbar
        nav={ close }
        actions={ null }
        className="md-divider-border md-divider-border--bottom"
      />
    );
    return (
      <Row>
        <Col xs>

          <form onSubmit={ handleSubmit }>
            <Drawer
              { ...this.state }
              onVisibilityToggle={ this._handleToggle }
              type={ Drawer.DrawerTypes.TEMPORARY }
              header={ header }
              style={ { zIndex: 1001, width: '350px' } }
            >
              <Wrapper>
                <Field
                  name="title"
                  type="text"
                  component={ TextField }
                  label="Post Title"
                />
              <Field name="feature_image" type="text"
                helpText="URL for your image"
                component={ TextField }
                label="Feature Image"
              />
              <Field name="excerpt"
                id="post-excerpt"
                type="text"
                component={ TextField }
                label="Excerpt"
                helpText="A brief overview or area from your post to highlight"
                rows={ 2 }
                maxRows={ 4 }
              />
              <Footer>
                <Row>
                  <Col xs={ 12 } md={ 6 }>
                    <Heading size={ 4 }>Post Status:</Heading>
                  </Col>
                  <Col xs={ 12 } md={ 6 }>
                    <div>
                      <label>
                        <Field name="published" component="input" type="radio" value="false" /> Draft</label>{ ' ' }
                      <label>
                        <Field name="published" component="input" type="radio" value="true" /> Publish
                      </label>
                    </div>
                  </Col>
                </Row>
                <Button raised primary type="submit" label="Save Post" />
              </Footer>
            </Wrapper>
          </Drawer>
          <Field name="content" component={ renderEditor } />
        </form>
        <Button floating onClick={ this._toggleRight } style={ fab } secondary>
          <FontIcon>forward</FontIcon>
        </Button>
        </Col>
      </Row>
    );
  }
}

export default reduxForm({
  form: 'editPostForm',
})(EditPostForm);

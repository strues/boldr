import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { RadioButtonGroup, TextField } from 'redux-form-material-ui';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import { RadioButton } from 'material-ui/RadioButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import ContentForward from 'material-ui/svg-icons/content/forward';
import { TextEditor } from '../../../../../components/TextEditor';
import { Col, Row, Heading, S3Uploader } from '../../../../../components/index';
import { openDrawer, closeDrawer } from '../../../../../state/modules/boldr/ui/actions';
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
      open: false,
    };
    (this: any).menuButtonClick = this.menuButtonClick.bind(this);
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

  onSetOpen(open) {
    this.props.dispatch(openDrawer());
  }
  onSetClose(open) {
    this.props.dispatch(closeDrawer());
  }
  menuButtonClick(ev) {
    ev.preventDefault();
    const isOpen = this.props.drawer;
    isOpen ? this.onSetClose(this.state.open) : this.onSetOpen(this.state.open);
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
            <Drawer width={ 350 } openSecondary open={ this.props.drawer } >
              <IconButton onTouchTap={ this.menuButtonClick }>
                <CloseIcon />
              </IconButton>
              <Wrapper>
                <Field
                  name="title"
                  type="text"
                  component={ TextField }
                  fullWidth
                  floatingLabelText="Post Title"
                />
              <Field name="feature_image" type="text"
                hintText="URL for your image"
                component={ TextField }
                fullWidth
                floatingLabelText="Feature Image"
              />
              <Field name="excerpt"
                type="text"
                component={ TextField }
                floatingLabelText="Excerpt"
                hintText="A brief overview or area from your post to highlight"
                multiLine
                fullWidth
                rows={ 3 }
              />
              <Footer>
                <Row>
                  <Col xs={ 12 } md={ 6 }>
                    <Heading size={ 4 }>Post Status:</Heading>
                  </Col>
                  <Col xs={ 12 } md={ 6 }>
                    <Field name="status" component={ RadioButtonGroup }>
                     <RadioButton value="draft" label="Draft" />
                     <RadioButton value="published" label="Published" />
                     <RadioButton value="archived" label="Archived" />
                   </Field>
                  </Col>
                </Row>
                <RaisedButton primary type="submit" label="Save Post" />
              </Footer>
            </Wrapper>
          </Drawer>
          <Field name="content" component={ renderEditor } />
        </form>
        <FloatingActionButton onTouchTap={ this.menuButtonClick } style={ fab } secondary>
          <ContentForward />
        </FloatingActionButton>
        </Col>
      </Row>
    );
  }
}

export default reduxForm({
  form: 'editPostForm',
})(EditPostForm);

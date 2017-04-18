import React, {Component} from 'react';
import {Field, reduxForm, FieldArray} from 'redux-form';
import {connect} from 'react-redux';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import {
  TabsContainer,
  Switch,
  Tab,
  Tabs,
  Button,
  InputField,
  Col,
  Row,
  Heading,
  FormGroup,
} from 'boldr-ui';

import {
  uploadPostImage,
} from '../../../../../../state/modules/attachments/actions';
import RenderTags from '../RenderTags';
import FieldEditor from './FieldEditor';

const Wrapper = styled.div`
  padding: 1em;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12), 0 2px 4px -1px rgba(0, 0, 0, .4);
  background-color: #fff;
`;

const NewPost = styled.section`
  width: 100%;
  margin-top: 10px;
  padding-bottom: 50px;
  background-color: #e5eaed;
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
      activeTabIndex: 0,
      checked: false,
    };
    this._handleTabChange = this._handleTabChange.bind(this);
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
  _handleTabChange(activeTabIndex) {
    this.setState({activeTabIndex});
  }
  _handleSwitch = checked => {
    this.setState({checked});
  };
  render() {
    const {handleSubmit} = this.props;
    const {activeTabIndex, checked} = this.state;

    return (
      <NewPost>
        <Heading size={3} weight={300}>Create a new post</Heading>
        <form onSubmit={handleSubmit}>
          <Wrapper>
            <FormGroup>
              <Field
                id="post-title"
                name="title"
                type="text"
                component={InputField}
                label="Post Title"
                tabIndex={0}
              />
            </FormGroup>
            <FormGroup>
              <Heading size={5}>Tag your post</Heading>
              <FieldArray
                name="tags"
                type="text"
                id="post-tags"
                component={RenderTags}
                label="Tags"
                tabIndex={-1}
              />
            </FormGroup>
          </Wrapper>
          <TabsContainer
            onTabChange={this._handleTabChange}
            activeTabIndex={activeTabIndex}
            panelClassName="md-grid"
            colored
          >
            <Tabs tabId="tab">
              <Tab label="Write">
                <Wrapper>
                  <Field
                    component={FieldEditor}
                    label="Content"
                    name="content"
                    tabIndex={-2}
                  />
                </Wrapper>

              </Tab>
              <Tab label="Publish">
                <CSSTransitionGroup
                  component="div"
                  className="md-cell md-cell--12"
                  transitionName="md-cross-fade"
                  transitionEnterTimeout={300}
                  transitionLeave={false}
                >
                  <FormGroup>
                    <Heading size={5} top="2rem" bottom="0px">
                      Upload a feature image
                    </Heading>
                    {/* <Row>
                <Switch
                  id="imgSwitch"
                  name="imgSwitch"
                  label="Upload post background image"
                  checked={ checked }
                  onChange={ this._handleSwitch }
                />
                <Button
                  icon
                  tooltipLabel="The feature image will be used if a background image isnt uploaded."
                >
                  help
                </Button>
              </Row> */}
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
                      <p className="boldr-dropzone__drop-sm">
                        Drop an image here or select one from your computer.
                        {' '}
                        <br />
                        It will upload right away.
                      </p>
                    </Dropzone>
                  </FormGroup>
                  <Wrapper>
                    <FormGroup>
                      <Field
                        name="excerpt"
                        id="post-excerpt"
                        type="text"
                        component={InputField}
                        label="Excerpt"
                        tabIndex={-3}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Heading size={5}>Status:</Heading>
                      <label style={{marginRight: '10px'}} htmlFor="draft">
                        <Field
                          id="draft"
                          name="published"
                          component="input"
                          type="radio"
                          value="false"
                        />
                        {' '}
                        Draft
                      </label>
                      <label htmlFor="published">
                        <Field
                          id="published"
                          name="published"
                          component="input"
                          type="radio"
                          value="true"
                        />
                        {' '}
                        Publish
                      </label>
                    </FormGroup>

                    <Button raised primary type="submit" label="Save Post" />
                  </Wrapper>
                </CSSTransitionGroup>
              </Tab>
            </Tabs>
          </TabsContainer>
        </form>
      </NewPost>
    );
  }
}

export default reduxForm({
  form: 'newPostForm',
})(NewPostForm);

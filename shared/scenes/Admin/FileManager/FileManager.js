/* @flow */
import React, { Component } from 'react';
import Toolbar from 'react-md/lib/Toolbars';
import Button from 'react-md/lib/Buttons/Button';
import Collapse from 'react-md/lib/Helpers/Collapse';
import FontIcon from 'react-md/lib/FontIcons';
import Paper from 'react-md/lib/Papers';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Tabs from 'react-md/lib/Tabs/Tabs';
import Tab from 'react-md/lib/Tabs/Tab';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import TabsContainer from 'react-md/lib/Tabs/TabsContainer';
import Slider from 'react-md/lib/Sliders';
import Dropzone from 'react-dropzone';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { uploadFiles } from '../../../state/modules/admin/attachments/actions';
import FileCardView from './components/FileCardView';
import FileListView from './components/FileListView';

type Props = {
  onUploadFinish: () => void,
  attachments: Object,
  handleRemoveMedia: () => void,
  uploadFiles: () => void,
  dropzone: any,
  dispatch: Function,
  ui: Object,
  selectFile: () => void,
};

type State = {
  activeTabIndex: Number,
  tabTwoChildren: any,
  collapsed: any,
  files: Array<Object>,
  file: Object,
};
class FileManager extends Component {
  constructor(props: Props) {
    super(props);

    (this: any).state = { activeTabIndex: 0, tabTwoChildren: null, collapsed: true, files: [] };
    (this: any)._handleTabChange = this._handleTabChange.bind(this);
    (this: any)._toggleCollapse = this._toggleCollapse.bind(this);
    (this: any).onDrop = this.onDrop.bind(this);
    (this: any).onOpenClick = this.onOpenClick.bind(this);
  }
  state: State;

  props: Props;
  onDrop(files) {
    this.setState({
      file: files[0],
    });
    const payload = files[0];
    this.props.dispatch(uploadFiles(payload));
  }
  onOpenClick() {
    (this: any).dropzone.open();
  }

  _handleTabChange(activeTabIndex: Number) {
    this.setState({ activeTabIndex });
  }
  _toggleCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }
  render() {
    const { activeTabIndex } = this.state;
    let { tabTwoChildren } = this.state;

    if (!tabTwoChildren && activeTabIndex === 1) {
      tabTwoChildren = <CircularProgress id="loading-tab-two" key="loading" />;
    }
    const { attachments, handleRemoveMedia, onUploadFinish, ui } = this.props;
    return (
    <div>
      <Helmet title="Admin: File Manager" />
      <Toolbar
        titleStyle={ { color: '#fff' } }
        style={ { backgroundColor: '#22262d' } }
        title="File Manager"
        nav={ null }
        actions={ <Button onClick={ this._toggleCollapse } label="Upload File" raised primary /> }
      />
      <Collapse collapsed={ this.state.collapsed }>
        <Dropzone
          className="boldr-dropzone boldr-dropzone__panel"
          ref={ (node) => { (this: any).dropzone = node; } }
          multiple={ false }
          onDrop={ this.onDrop }
          accept="image/*"
          maxSize={ 5242880 }
        >
          <p className="boldr-dropzone__drop">Drop an image here or select one from your computer. <br />
          It will upload right away.</p>
        </Dropzone>
      </Collapse>
      <TabsContainer
        onTabChange={ this._handleTabChange }
        activeTabIndex={ activeTabIndex }
        panelClassName="md-grid"
        colored
      >
        <Tabs tabId="tab">
          <Tab label="Card View">
            <FileCardView
              files={ attachments.files }
              removeMedia={ handleRemoveMedia }
              selectFile={ this.props.selectFile }
            />
          </Tab>
          <Tab label="List View">
            <CSSTransitionGroup
              component="div"
              className="md-cell md-cell--12"
              transitionName="md-cross-fade"
              transitionEnterTimeout={ 300 }
              transitionLeave={ false }
            >
              <FileListView
                files={ attachments.files }
                removeMedia={ handleRemoveMedia }
                selectFile={ this.props.selectFile }
              />
            </CSSTransitionGroup>
          </Tab>
        </Tabs>
      </TabsContainer>
    </div>
    );
  }
}

export default connect()(FileManager);

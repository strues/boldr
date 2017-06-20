/* @flow */
import React, { Component } from 'react';
import Button from '~components/Button';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
// $FlowIssue
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import { uploadFiles } from '../state';
import FileCardView from './components/FileCardView';

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
  collapsed: any,
  files: Array<Object>,
  file: Object,
};
class FileManager extends Component {
  constructor(props: Props) {
    super(props);

    (this: any).state = {
      collapsed: true,
    };

    (this: any)._toggleCollapse = this._toggleCollapse.bind(this);
  }
  state: State;

  props: Props;

  _toggleCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const { attachments, handleRemoveMedia } = this.props;
    return (
      <div>
        <Helmet title="Admin: File Manager" />
        <Toolbar style={{ backgroundColor: 'rgba(46, 54, 61, 1.00)', color: '#fff' }}>
          <ToolbarGroup>
            <ToolbarTitle text="File Manager" />
            <Button onClick={this._toggleCollapse} kind="secondary">Upload File</Button>
          </ToolbarGroup>
        </Toolbar>

        <FileCardView
          files={attachments.files}
          removeMedia={handleRemoveMedia}
          selectFile={this.props.selectFile}
        />
      </div>
    );
  }
}

export default connect()(FileManager);

/* @flow */
import React, { Component } from 'react';
import Button from '~components/Button';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
// $FlowIssue
import Dropzone from 'react-dropzone';
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
      files: [],
    };

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

  _toggleCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const { attachments, handleRemoveMedia } = this.props;
    return (
      <div>
        <Helmet title="Admin: File Manager" />
        <Toolbar
          style={{ backgroundColor: 'rgba(46, 54, 61, 1.00)', color: '#fff' }}
        >
          <ToolbarGroup>
            <ToolbarTitle text="File Manager" />
            <Button
              onClick={this._toggleCollapse}
              kind="secondary"
            >Upload File</Button>
          </ToolbarGroup>
        </Toolbar>
        <Dropzone
          className="boldr-dropzone boldr-dropzone__panel"
          ref={node => {
            (this: any).dropzone = node;
          }}
          multiple={false}
          onDrop={this.onDrop}
          accept="image/*"
          maxSize={5242880}
        >
          <p className="boldr-dropzone__drop">
            Drop an image here or select one from your computer. <br />
            It will upload right away.
          </p>
        </Dropzone>
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

/* eslint-disable react/no-array-index-key, no-script-url, no-return-assign, no-unused-expressions, consistent-return */
// @flow
import React, { Component } from 'react';
import { AtomicBlockUtils, EditorState } from 'draft-js';
// $FlowIssue
import type { ContentState } from 'draft-js';
import uuid from 'uuid/v4';
import Dialog from '@boldr/ui/Dialog';
// import Modal from '../Modal';
import Uploader from '../../core/helpers/uploader';

import { selectNextBlock } from '../../utils/editor';
import type { OptionMedia } from '../../core/configs/options';

const imageMediaType = 'image/png,image/jpeg,image/gif,image/webp,image/apng,image/svg';
const videoMediaType = 'video/mp4';
const audioMediaType = 'audio/mp3';

type Props = {
  media: OptionMedia,
  language: Object,
  editorState: EditorState,
  contentState: ContentState,
  onChange: Function,
};
type State = {
  visible: boolean,
  showExternalForm: boolean,
  dragging: boolean,
  error: boolean,
  confirmable: boolean,
  external: Object,
  files: Array<Object>,
};

export default class MediaPicker extends Component<Props, State> {
  state = {
    visible: false,
    showExternalForm: true,
    dragging: false,
    confirmable: false,
    external: {
      url: '',
      type: [
        this.props.media.image ? 'IMAGE' : null,
        this.props.media.video ? 'VIDEO' : null,
        this.props.media.audio ? 'AUDIO' : null,
      ].filter(item => item)[0],
    },
    files: [],
  };

  componentDidMount() {
    (this: any).uploader = new Uploader();
    this.uploader.uploadFn = this.props.media.uploadFn || null;
    this.uploader.onChange = files => {
      this.setState({
        files,
        confirmable: Boolean(files.filter(item => item.selected).length),
      });
    };
  }

  props: Props;

  mediaFileAccept = [
    this.props.media.image ? imageMediaType : null,
    this.props.media.video ? videoMediaType : null,
    this.props.media.audio ? audioMediaType : null,
  ]
    .filter(item => item)
    .join(',');
  buildMediaList() {
    return (
      <ul className="be-media__list">
        <li className="be-media__add-item">
          <i className="icon-add" />
          <input
            accept={this.mediaFileAccept}
            onChange={this.handleFilesPicked}
            multiple
            type="file"
          />
        </li>
        {this.state.files.map((file, index) => {
          let previewerComponents = null;
          const progressMarker = file.uploading
            ? <div className="be-media__item-uploading">
                <div
                  className="be-media__item-uploading-bar"
                  style={{ width: `${file.uploadProgress / 1}%` }}
                />
              </div>
            : '';

          switch (file.type) {
            case 'IMAGE':
              previewerComponents = (
                <div className="be-media__image">
                  {progressMarker}
                  <img src={file.thumbnail} />
                </div>
              );
              break;
            case 'VIDEO':
              previewerComponents = (
                <div className="be-media__icon be-media__video" title={file.url}>
                  {progressMarker}
                  <i className="icon-film" />
                  <span>
                    {file.name || file.url}
                  </span>
                </div>
              );
              break;
            case 'AUDIO':
              previewerComponents = (
                <div className="be-media__icon be-media__audio" title={file.url}>
                  {progressMarker}
                  <i className="icon-music" />
                  <span>
                    {file.name || file.url}
                  </span>
                </div>
              );
              break;
            default:
              previewerComponents = (
                <a className="be-media__icon be-media__file" title={file.url} href={file.url}>
                  {progressMarker}
                  <i className="icon-file-text" />
                  <span>
                    {file.name || file.url}
                  </span>
                </a>
              );
              break;
          }

          const className = ['be-media__item'];
          file.selected && className.push('active');
          file.uploading && className.push('uploading');
          file.error && className.push('error');

          return (
            <li
              key={index}
              title={file.name}
              className={className.join(' ')}
              onClick={() => this.toggleFileSelected(file)}
            >
              {previewerComponents}
              <span
                data-id={file.id}
                onClick={this.handleRemoveFileClick}
                className="be-media__item-remove icon-close"
              />
              <span className="be-media__item-title">
                {file.name}
              </span>
            </li>
          );
        })}
      </ul>
    );
  }

  toggleFileSelected = file => {
    let { id, selected, error, uploading } = file;

    if (error || uploading) {
      return false;
    }

    selected = !selected;
    this.uploader.setItemState(id, { selected });
  };

  handleRemoveFileClick = (event: MouseEvent) => {
    this.uploader.removeItem(event.target.dataset.id);
    event.stopPropagation();
  };

  handleDragLeave = () => {
    this.setState({
      dragging: false,
    });
  };

  handleDragEnter = () => {
    this.setState({
      dragging: true,
    });
  };

  handleFilesPicked = e => {
    const { files } = e.target;
    const length = files.length;

    e.persist();

    const resolveFile = index => {
      if (index < length) {
        const data = {
          id: `${uuid()}`,
          file: files[index],
          name: files[index].name,
          size: files[index].size,
          uploadProgress: 0,
          uploading: false,
          selected: false,
          error: 0,
        };

        if (files[index].type.indexOf('image/') === 0 && this.props.media.image) {
          data.type = 'IMAGE';
          this.uploader.addItems([data]);
        } else if (files[index].type.indexOf('video/') === 0 && this.props.media.video) {
          data.type = 'VIDEO';
          this.uploader.addItems([data]);
        } else if (files[index].type.indexOf('audio/') === 0 && this.props.media.audio) {
          data.type = 'AUDIO';
          this.uploader.addItems([data]);
        }

        setTimeout(() => {
          resolveFile(index + 1);
        }, 100);
      } else {
        e.target.value = null;
      }
    };

    resolveFile(0);
  };

  inputExternal = e => {
    this.setState({
      external: {
        ...this.state.external,
        url: e.target.value,
      },
    });
  };

  switchExternalType = e => {
    this.setState({
      external: { ...this.state.external, type: e.target.dataset.type },
    });
  };

  confirmAddExternal = e => {
    if (e.keyCode === 13) {
      let { url, type } = this.state.external;
      url = url.split('|');
      const name = url.length > 1 ? url[0] : this.props.language.mediaPicker.unnamedItem;
      url = url.length > 1 ? url[1] : url[0];
      const thumbnail = type === 'IMAGE' ? url : null;
      this.uploader.addItems([
        {
          thumbnail,
          url,
          name,
          type,
          id: uuid(),
          uploading: false,
          uploadProgress: 1,
          selected: true,
        },
      ]);
      this.setState({
        showExternalForm: false,
        external: {
          url: '',
          type: 'IMAGE',
        },
      });
    }
  };

  toggleExternalMode = () => {
    this.setState({
      showExternalForm: !this.state.showExternalForm,
    });
  };

  confirmInsertMedia = () => {
    const { editorState, contentState, onChange } = this.props;
    const selectedFiles = this.state.files.filter(item => item.selected);

    if (selectedFiles.length === 0) {
      return false;
    }

    let newEditorState = editorState;
    const currentSelectedBlockKey = editorState.getSelection().getAnchorKey();

    if (
      currentSelectedBlockKey &&
      contentState.getBlockForKey(currentSelectedBlockKey).getType() === 'atomic'
    ) {
      newEditorState = selectNextBlock(editorState, currentSelectedBlockKey);
    }

    selectedFiles.forEach(file => {
      const entityData = {
        url: file.url,
        name: file.name,
        type: file.type,
        meta: file.meta,
      };

      const contentStateWithEntity = contentState.createEntity(file.type, 'IMMUTABLE', entityData);
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      newEditorState = AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
    });

    onChange(newEditorState);
    this.hide();
  };

  show = () => {
    this.setState({
      visible: true,
    });
  };

  hide = () => {
    this.setState(
      {
        visible: false,
      },
      () => {
        this.uploader.unselectAllItem();
      },
    );
  };
  render() {
    const { language } = this.props;
    const { files, visible, external, dragging, confirmable, showExternalForm } = this.state;
    const bottomText = (
      <span onClick={this.toggleExternalMode} className="be-media__toggle-external-mode">
        {showExternalForm
          ? <span>
              <i className="icon-add" /> {language.mediaPicker.addLocalFile}
            </span>
          : <span>
              <i className="icon-add" /> {language.mediaPicker.addExternalSource}
            </span>}
      </span>
    );

    return (
      <Dialog title={language.mediaPicker.caption} visible={visible} onClose={this.hide}>
        <div className="be-modal__body">
          <div className="be-media__uploader">
            {files.length
              ? <div className="be-media__list-wrap">
                  {this.buildMediaList()}
                </div>
              : <div
                  onDragEnter={this.handleDragEnter}
                  onDragLeave={this.handleDragLeave}
                  className={`be-media__drag-uploader ${dragging ? 'active' : ''}`}
                >
                  <span className="be-media__drag-tip">
                    <input
                      accept={this.mediaFileAccept}
                      onChange={this.handleFilesPicked}
                      multiple
                      type="file"
                    />
                    {dragging ? language.mediaPicker.dropTip : language.mediaPicker.dragTip}
                  </span>
                </div>}
            {showExternalForm
              ? <div className="be-media__add-external">
                  <div className="be-media__external-form">
                    <input
                      onKeyDown={this.confirmAddExternal}
                      value={external.url}
                      onChange={this.inputExternal}
                      placeholder={language.mediaPicker.externalInputPlaceHolder}
                    />
                    <div data-type={external.type} className="be-media__switch-external-type">
                      <button onClick={this.switchExternalType} data-type="IMAGE">
                        {language.media.image}
                      </button>
                      <button onClick={this.switchExternalType} data-type="VIDEO">
                        {language.media.video}
                      </button>
                      <button onClick={this.switchExternalType} data-type="AUDIO">
                        {language.media.audio}
                      </button>
                    </div>
                    <span className="be-media__external-tip">
                      {language.mediaPicker.externalInputTip}
                    </span>
                  </div>
                </div>
              : null}
          </div>
          <div className="be-modal__footer">
            <div className="be-modal__addon-text">
              {bottomText}
            </div>
            <div className="be-modal__buttons">
              <button onClick={this.hide} className="be-modal__cancel">
                {language.base.cancel}
              </button>
              <button
                onClick={this.confirmInsertMedia}
                className={`be-modal__confirm ${!confirmable && !showExternalForm
                  ? 'disabled'
                  : ''}`}
              >
                {language.base.confirm}
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}

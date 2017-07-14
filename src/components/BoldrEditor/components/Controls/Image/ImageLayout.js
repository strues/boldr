/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '@boldr/ui/Icons/Icon';
import Option from '../../Option';
import Spinner from '../../Spinner';

export type Props = {
  expanded?: boolean,
  doExpand?: Function,
  doCollapse?: Function,
  onExpandEvent?: Function,
  config?: Object,
  onChange?: Function,
  currentState?: Object,
};

class ImageLayout extends Component {
  state: Object = {
    imgSrc: '',
    dragEnter: false,
    uploadHighlighted: this.props.config.uploadEnabled && !!this.props.config.uploadCallback,
    showImageLoading: false,
    height: this.props.config.defaultSize.height,
    width: this.props.config.defaultSize.width,
  };

  componentWillReceiveProps(props: Object): void {
    if (this.props.expanded && !props.expanded) {
      this.setState({
        imgSrc: '',
        dragEnter: false,
        uploadHighlighted: this.props.config.uploadEnabled && !!this.props.config.uploadCallback,
        showImageLoading: false,
        height: this.props.config.defaultSize.height,
        width: this.props.config.defaultSize.width,
      });
    } else if (
      props.config.uploadCallback !== this.props.config.uploadCallback ||
      props.config.uploadEnabled !== this.props.config.uploadEnabled
    ) {
      this.setState({
        uploadHighlighted: props.config.uploadEnabled && !!props.config.uploadCallback,
      });
    }
  }
  props: Props;
  updateValue: Function = (event: Object): void => {
    this.setState({
      [`${event.target.name}`]: event.target.value,
    });
  };

  toggleShowImageLoading: Function = (): void => {
    const showImageLoading = !this.state.showImageLoading;
    this.setState({
      showImageLoading,
    });
  };

  showImageURLOption: Function = (): void => {
    this.setState({
      uploadHighlighted: false,
    });
  };

  showImageUploadOption: Function = (): void => {
    this.setState({
      uploadHighlighted: true,
    });
  };

  addImageFromState: Function = (): void => {
    const { imgSrc, height, width } = this.state;
    const { onChange } = this.props;
    onChange(imgSrc, height, width);
  };

  addImageFromSrcLink: Function = (imgSrc: string): void => {
    const { height, width } = this.state;
    const { onChange } = this.props;
    onChange(imgSrc, height, width);
  };

  onImageDrop: Function = (event: Object): void => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      dragEnter: false,
    });

    // Check if property name is files or items
    let data = event.dataTransfer.items;
    let dataIsItems = true;

    // IE uses 'files' instead of 'items'
    if (!data) {
      data = event.dataTransfer.files;
      dataIsItems = false;
    }

    for (let i = 0; i < data.length; i += 1) {
      if (data[i].kind === 'string' && data[i].type.match('^text/plain')) {
        // This item is the target node
        continue;
      } else if (data[i].kind === 'string' && data[i].type.match('^text/html')) {
        // Drag data item is HTML
        continue;
      } else if (data[i].kind === 'string' && data[i].type.match('^text/uri-list')) {
        // Drag data item is URI
        continue;
      } else if ((!dataIsItems || data[i].kind === 'file') && data[i].type.match('^image/')) {
        // Drag data item is an image file
        const file = dataIsItems ? data[i].getAsFile() : data[i];
        this.uploadImage(file);
      }
    }
  };

  onDragEnter: Function = (event: Object): void => {
    this.stopPropagation(event);
    this.setState({
      dragEnter: true,
    });
  };

  selectImage: Function = (event: Object): void => {
    if (event.target.files && event.target.files.length > 0) {
      this.uploadImage(event.target.files[0]);
    }
  };

  uploadImage: Function = (file: Object): void => {
    this.toggleShowImageLoading();
    const { uploadCallback } = this.props.config;
    uploadCallback(file)
      .then(({ data }) => {
        this.setState({
          showImageLoading: false,
          dragEnter: false,
        });
        this.addImageFromSrcLink(data.link);
      })
      .catch(() => {
        this.setState({
          showImageLoading: false,
          dragEnter: false,
        });
      });
  };

  fileUploadClick = event => {
    this.fileUpload = true;
    event.stopPropagation();
  };

  stopPropagation: Function = (event: Object): void => {
    if (!this.fileUpload) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.fileUpload = false;
    }
  };

  renderAddImageModal(): Object {
    const { imgSrc, uploadHighlighted, showImageLoading, dragEnter, height, width } = this.state;
    const {
      config: { popupClassName, uploadCallback, uploadEnabled, urlEnabled, inputAccept },
      doCollapse,
    } = this.props;
    return (
      <div
        className={classNames('boldrui-editor__image-modal', popupClassName)}
        onClick={this.stopPropagation}
      >
        <div className="boldrui-editor__image-modal-header">
          {uploadEnabled &&
            uploadCallback &&
            <span
              onClick={this.showImageUploadOption}
              className="boldrui-editor__image-modal-header-option"
            >
              Upload
              <span
                className={classNames('boldrui-editor__image-modal-header-label', {
                  'boldrui-editor__image-modal-header-label-highlighted': uploadHighlighted,
                })}
              />
            </span>}
          {urlEnabled &&
            <span
              onClick={this.showImageURLOption}
              className="boldrui-editor__image-modal-header-option"
            >
              Upload URL
              <span
                className={classNames('boldrui-editor__image-modal-header-label', {
                  'boldrui-editor__image-modal-header-label-highlighted': !uploadHighlighted,
                })}
              />
            </span>}
        </div>
        {uploadHighlighted
          ? <div onClick={this.fileUploadClick}>
              <div
                onDragEnter={this.onDragEnter}
                onDragOver={this.stopPropagation}
                onDrop={this.onImageDrop}
                className={classNames('boldrui-editor__image-modal-upload-option', {
                  'boldrui-editor__image-modal-upload-option-highlighted': dragEnter,
                })}
              >
                <label htmlFor="file" className="boldrui-editor__image-modal-upload-option-label">
                  Drop the file or click to upload
                </label>
              </div>
              <input
                type="file"
                id="file"
                accept={inputAccept}
                onChange={this.selectImage}
                className="boldrui-editor__image-modal-upload-option-input"
              />
            </div>
          : <div className="boldrui-editor__image-modal-url-section">
              <input
                className="boldrui-editor__image-modal-url-input"
                placeholder="Enter url"
                name="imgSrc"
                onChange={this.updateValue}
                onBlur={this.updateValue}
                value={imgSrc}
              />
            </div>}
        <div className="boldrui-editor__embedded-modal-size">
          ↕&nbsp;
          <input
            onChange={this.updateValue}
            onBlur={this.updateValue}
            value={height}
            name="height"
            className="boldrui-editor__embedded-modal-size-input"
            placeholder="Height"
          />
          &nbsp;↔&nbsp;
          <input
            onChange={this.updateValue}
            onBlur={this.updateValue}
            value={width}
            name="width"
            className="boldrui-editor__embedded-modal-size-input"
            placeholder="Width"
          />
        </div>
        <span className="boldrui-editor__image-modal-btn-section">
          <button
            className="boldrui-editor__image-modal-btn"
            onClick={this.addImageFromState}
            disabled={!imgSrc || !height || !width}
          >
            Add
          </button>
          <button className="boldrui-editor__image-modal-btn" onClick={doCollapse}>
            Cancel
          </button>
        </span>
        {showImageLoading
          ? <div className="boldrui-editor__image-modal-spinner">
              <Spinner />
            </div>
          : undefined}
      </div>
    );
  }

  render(): Object {
    const { config: { icon, className, title }, expanded, onExpandEvent } = this.props;
    return (
      <div
        className="boldrui-editor__image-wrapper"
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="boldrui-editor__image-control"
      >
        <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={onExpandEvent}
          title={title}
        >
          <Icon kind="image" color="#222" />
        </Option>
        {expanded ? this.renderAddImageModal() : undefined}
      </div>
    );
  }
}

export default ImageLayout;

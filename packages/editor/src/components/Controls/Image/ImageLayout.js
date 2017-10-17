/* eslint-disable no-continue */
/* @flow */

import React from 'react';
import type { Node } from 'react';
import cn from 'classnames';
import Image from '@boldr/icons/Image';
import Option from '../../Option';
import Spinner from '../../Spinner';
import type { ImageConfig } from '../../../core/config';

export type Props = {
  expanded?: boolean,
  doCollapse?: Function,
  onExpandEvent?: Function,
  config: ImageConfig,
  onChange?: Function,
};

type State = {
  imgSrc: string,
  dragEnter: boolean,
  uploadHighlighted: boolean,
  showImageLoading: boolean,
  height: 'auto' | number,
  width: 'auto' | number,
  alt: string,
};

class ImageLayout extends React.Component<Props, State> {
  state: State = {
    imgSrc: '',
    dragEnter: false,
    uploadHighlighted: this.props.config.uploadEnabled && Boolean(this.props.config.uploadCallback),
    showImageLoading: false,
    height: this.props.config.defaultSize.height,
    width: this.props.config.defaultSize.width,
  };

  componentWillReceiveProps(props: Props): void {
    if (this.props.expanded && !props.expanded) {
      this.setState({
        imgSrc: '',
        dragEnter: false,
        uploadHighlighted:
          this.props.config.uploadEnabled && Boolean(this.props.config.uploadCallback),
        showImageLoading: false,
        height: this.props.config.defaultSize.height,
        width: this.props.config.defaultSize.width,
      });
    } else if (
      props.config.uploadCallback !== this.props.config.uploadCallback ||
      props.config.uploadEnabled !== this.props.config.uploadEnabled
    ) {
      this.setState({
        uploadHighlighted: props.config.uploadEnabled && Boolean(props.config.uploadCallback),
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

  onDragEnter: Function = (event: SyntheticEvent<>): void => {
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
    const { uploadCallback, fileUrl } = this.props.config;
    uploadCallback(file)
      .then(({ data }) => {
        this.setState({
          showImageLoading: false,
          dragEnter: false,
        });
        // @note: data.uploadMedia is the GraphQL mutation.
        return this.addImageFromSrcLink(`${fileUrl}/${data.uploadMedia.name}`);
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

  renderAddImageModal(): Node {
    const { imgSrc, uploadHighlighted, showImageLoading, dragEnter, height, width } = this.state;
    const {
      config: { modalClassName, uploadCallback, uploadEnabled, urlEnabled, inputAccept },
    } = this.props;
    return (
      <div className={cn('be-modal', modalClassName)} onClick={this.stopPropagation}>
        <div className={cn('be-modal__top')}>
          {uploadEnabled &&
            uploadCallback && (
              <span className={cn('be-modal__opt')} onClick={this.showImageUploadOption}>
                Upload
                <span
                  className={cn('be-modal__label', {
                    'is-hlight': uploadHighlighted,
                  })}
                />
              </span>
            )}
          {urlEnabled && (
            <span className={cn('be-modal__opt')} onClick={this.showImageURLOption}>
              Upload URL
              <span
                className={cn('be-modal__label', {
                  'is-hlight': !uploadHighlighted,
                })}
              />
            </span>
          )}
        </div>
        {uploadHighlighted ? (
          <div onClick={this.fileUploadClick}>
            <div
              className={cn('be-modal__upload', {
                'is-hlight': dragEnter,
              })}
              onDragEnter={this.onDragEnter}
              onDragOver={this.stopPropagation}
              onDrop={this.onImageDrop}>
              <label className={cn('be-modal__upload-label')} htmlFor="file">
                Drop the file or click to upload
              </label>
            </div>
            <input
              className={cn('be-modal__upload-input')}
              type="file"
              id="file"
              accept={inputAccept}
              onChange={this.selectImage}
            />
          </div>
        ) : (
          <div className={cn('be-modal__top')}>
            <input
              className={cn('be-modal__upload-url-input')}
              placeholder="Enter url"
              name="imgSrc"
              onChange={this.updateValue}
              onBlur={this.updateValue}
              value={imgSrc}
            />
          </div>
        )}
        <div className={cn('be-modal__sizes')}>
          {' ↕ '}
          <input
            className={cn('be-modal__input be-modal__input--sm')}
            onChange={this.updateValue}
            onBlur={this.updateValue}
            value={height}
            name="height"
            placeholder="Height"
          />
          {' ↔ '}
          <input
            className={cn('be-modal__input be-modal__input--sm')}
            onChange={this.updateValue}
            onBlur={this.updateValue}
            value={width}
            name="width"
            placeholder="Width"
          />
        </div>
        <div className={cn('be-modal__btns')}>
          <button
            className={cn('be-modal__btn')}
            onClick={this.addImageFromState}
            disabled={!imgSrc || !height || !width}>
            Add
          </button>
          <button className={cn('be-modal__btn')} onClick={this.props.doCollapse}>
            Cancel
          </button>
        </div>
        {showImageLoading ? (
          <div className="be-modal__spinner">
            <Spinner />
          </div>
        ) : (
          undefined
        )}
      </div>
    );
  }

  render(): Node {
    const { config: { className, title }, expanded } = this.props;
    return (
      <div
        className={cn('be-ctrl__group')}
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="be-image__control">
        <Option
          className={cn(className)}
          value="unordered-list-item"
          onClick={this.props.onExpandEvent}
          title={title}>
          <Image color="#222" />
        </Option>
        {expanded ? this.renderAddImageModal() : undefined}
      </div>
    );
  }
}

export default ImageLayout;

/* eslint-disable no-continue */
/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import Image from '@boldr/icons/Image';
import Option from '../../Option';
import Spinner from '../../Spinner';
import { ControlWrapper } from '../Controls.styled';
import type { ImageConfig } from '../../../core/config';
import {
  ImageModal,
  ImageHeader,
  ImageOption,
  ImageLabel,
  UploadOpt,
  UploadInput,
  UploadUrlInput,
  UrlSection,
  UploadLabel,
  SizeSection,
  SizeInput,
  ImageBtn,
  ImageBtnSection,
} from './Image.styled';

export type Props = {
  expanded?: boolean,
  doCollapse: Function,
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

  renderAddImageModal(): React.Node {
    const { imgSrc, uploadHighlighted, showImageLoading, dragEnter, height, width } = this.state;
    const {
      config: { modalClassName, uploadCallback, uploadEnabled, urlEnabled, inputAccept },
    } = this.props;
    return (
      <ImageModal className={modalClassName} onClick={this.stopPropagation}>
        <ImageHeader>
          {uploadEnabled &&
            uploadCallback &&
            <ImageOption onClick={this.showImageUploadOption}>
              Upload
              <ImageLabel highlighted={uploadHighlighted} />
            </ImageOption>}
          {urlEnabled &&
            <ImageOption onClick={this.showImageURLOption}>
              Upload URL
              <ImageLabel highlighted={!uploadHighlighted} />
            </ImageOption>}
        </ImageHeader>
        {uploadHighlighted
          ? <div onClick={this.fileUploadClick}>
              <UploadOpt
                onDragEnter={this.onDragEnter}
                onDragOver={this.stopPropagation}
                onDrop={this.onImageDrop}
                highlighted={dragEnter}>
                <UploadLabel htmlFor="file">Drop the file or click to upload</UploadLabel>
              </UploadOpt>
              <UploadInput type="file" id="file" accept={inputAccept} onChange={this.selectImage} />
            </div>
          : <UrlSection>
              <UploadUrlInput
                placeholder="Enter url"
                name="imgSrc"
                onChange={this.updateValue}
                onBlur={this.updateValue}
                value={imgSrc}
              />
            </UrlSection>}
        <SizeSection>
          ↕&nbsp;
          <SizeInput
            onChange={this.updateValue}
            onBlur={this.updateValue}
            value={height}
            name="height"
            placeholder="Height"
          />
          &nbsp;↔&nbsp;
          <SizeInput
            onChange={this.updateValue}
            onBlur={this.updateValue}
            value={width}
            name="width"
            placeholder="Width"
          />
        </SizeSection>
        <ImageBtnSection>
          <ImageBtn onClick={this.addImageFromState} disabled={!imgSrc || !height || !width}>
            Add
          </ImageBtn>
          <ImageBtn onClick={this.props.doCollapse}>Cancel</ImageBtn>
        </ImageBtnSection>
        {showImageLoading
          ? <div className="be-image__modal-spinner">
              <Spinner />
            </div>
          : undefined}
      </ImageModal>
    );
  }

  render(): React.Node {
    const { config: { className, title }, expanded } = this.props;
    return (
      <ControlWrapper aria-haspopup="true" aria-expanded={expanded} aria-label="be-image__control">
        <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={this.props.onExpandEvent}
          title={title}>
          <Image color="#222" />
        </Option>
        {expanded ? this.renderAddImageModal() : undefined}
      </ControlWrapper>
    );
  }
}

export default ImageLayout;

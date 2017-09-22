// @flow
import * as React from 'react';
import Loader from '@boldr/ui/Loader';
import { UploadOpt, UploadInput, UploadLabel } from './Dropzone.styled';

type Props = {
  onChange?: Function,
  uploadCallback: Function,
  fileUrl: string,
  inputAccept: string,
};
type State = {
  dragEnter: boolean,
  uploadHighlighted: boolean,
  showImageLoading: boolean,
  alt: string,
};
class Dropzone extends React.Component<Props, State> {
  static defaultProps = {
    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
  };

  state: State = {
    dragEnter: false,
    showImageLoading: false,
  };

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
      if ((!dataIsItems || data[i].kind === 'file') && data[i].type.match('^image/')) {
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
    const { uploadCallback, fileUrl } = this.props;
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

  render() {
    const { inputAccept } = this.props;
    const { showImageLoading, dragEnter } = this.state;
    return (
      <div onClick={this.fileUploadClick}>
        {showImageLoading ? <Loader /> : null}
        <UploadOpt
          onDragEnter={this.onDragEnter}
          onDragOver={this.stopPropagation}
          onDrop={this.onImageDrop}
          highlighted={dragEnter}>
          <UploadLabel htmlFor="file">Drop the file or click to upload</UploadLabel>
        </UploadOpt>
        <UploadInput type="file" id="file" accept={inputAccept} onChange={this.selectImage} />
      </div>
    );
  }
}

export default Dropzone;

/* eslint
react/forbid-prop-types: 'warn',
no-restricted-syntax: 'warn'
*/
import React from 'react';
import api from '../../core/api';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';

const disableClick = true;

function convert(file) {
  return new Promise((resolve) => {
    const image = new Image();
    const canvas = document.createElement('canvas');
    const canvasContext = canvas.getContext('2d');

    image.src = file.preview;
    image.crossOrigin = 'anonymous';
    image.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;
      canvasContext.drawImage(image, 0, 0, image.width, image.height);

      const dataUrl = canvas.toDataURL();

      const newFile = {
        name: file.name,
        key: file.key,
        size: file.size,
        preview: dataUrl,
        type: file.type,
      };
      resolve(newFile);
    };
  });
}

class Uploader extends React.Component {
  static propTypes = {
    cropperConfig: PropTypes.object,
    dropzoneConfig: PropTypes.object,
    maxFiles: PropTypes.number,
    uploader: PropTypes.string,
    onComplete: PropTypes.func,
    uploadFunction: PropTypes.func
  };

  static defaultProps = {
    onComplete: () => {},
    maxFiles: 10,
    cropperConfig: {},
    dropzoneConfig: {
      style: {
        width: '100%',
        padding: '2.5em 0',
        background: 'rgba(0,0,0,0.5)',
        textAlign: 'center',
        color: '#fff',
      },
    },
  }
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
    this.onOpenZone = this.onOpenZone.bind(this);
    this.onUpload = this.onUpload.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onOpenClick = this.onOpenClick.bind(this);
  }

  onOpenClick() {
    this.dropzone.open();
  }
  onDrop(acceptedFiles) {
    const files = this.state.files;

    for (const acceptedFile of acceptedFiles) {
      const file = {
        name: acceptedFile.name,
        key: Math.random().toString(36).substring(1),
        size: acceptedFile.size,
        preview: acceptedFile.preview,
        path: acceptedFile.preview,
        type: acceptedFile.type,
      };

      if (files.length < this.props.maxFiles) {
        files.push(file);
      } else {
        break;
      }
    }

    this.setState({ files });
  }
  onUpdate(updateFile) {
    const files = this.state.files;
    const fileIndex = files.findIndex((file => file.key === updateFile.key));
    files[fileIndex] = updateFile;
    this.setState({ files });
  }

  // Upload converted file by JSON format to server
  onUpload() {
    const files = this.state.files;
    const funList = [];
    const uploadedFile = [];
    for (const file of files) {
      if (this.props.uploadFunction) {
        const payload = {
          name: file.name,
          path: file.preview,
          type: file.type,
        };
        funList.push(this.customUpload(file));
      } else {
        funList.push(this.upload(file));
      }
      uploadedFile.push({ key: file.key, name: file.name });
    }

    Promise.all(funList)
    .then((res) => {
      this.props.onComplete({ response: res, files: uploadedFile });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // Open dropzone without click dropzone
  onOpenZone() {
    this.dropzone.open();
  }
  removeFile(file) {
    const newList = this.state.files.filter(mFile => file !== mFile);
    this.setState({
      files: newList,
    });
  }

  // Upload file to upload hanlder by superagent
  upload(file) {
    const uploader = this.props.uploader;
    return new Promise((resolve, reject) => {
      convert(file)
      .then((newFile) => {
        const data = JSON.stringify(newFile);
        api.post(uploader).send(data).end((err, res) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(res);
        });
      });
    });
  }

  customUpload(file) {
    const uploaderFunc = this.props.uploadFunction;
    return new Promise((resolve, reject) => {
      convert(file)
      .then((newFile) => {
        const data = JSON.stringify(newFile);
        console.log(data)
        uploaderFunc(file)
          .then(res => {
            console.log(res)
          })
          .catch(err => reject(err))
      });
    });
  }

  render() {
    return (
      <div className="dropzone">
        <Dropzone
          {... this.props.dropzoneConfig}
          accept={'image/*'
          }
          ref={(node) => { this.dropzone = node; }}
          onDrop={this.onDrop}
          disableClick={disableClick}
        >
          <div>Drop images here to upload them.</div>
          {this.state.files.length > 0 ?
            <div className="image-wrapper">
              <button className="Uploader-btn" type="button" onClick={this.onOpenZone}>Open Dropzone</button>
              <button className="Uploader-btn" type="button" onClick={this.onUpload}>Upload</button>
              <p className="help-block">Click Image to crop it.</p>
              {this.state.files.map(file => (
                <img key={file.key} alt="file preview" src={file.preview}  />

              ))}
            </div> : <button className="Uploader-btn" type="button" onClick={this.onOpenClick}>Open Dropzone</button>
          }
        </Dropzone>
      </div>
    );
  }
}

export default Uploader;

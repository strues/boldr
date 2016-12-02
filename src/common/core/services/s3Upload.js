class S3Upload {
  constructor(options) {
    if (options === null) {
      options = {};
    }
    for (const option in options) {
      if (options.hasOwnProperty(option)) {
        this[option] = options[option];
      }
    }
    const file = this.fileElement;
    this.handleFileSelect(file);
  }

  handleFileSelect(file) {
    const result = [];
    this.preprocess(file, (processedFile) => {
      this.onProgress(0, 'Waiting', processedFile);
      result.push(this.uploadFile(processedFile));
      return result;
    });
  }

  createCORSRequest(method, url) {
    let xhr = new XMLHttpRequest();

    if (xhr.withCredentials !== null) {
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest !== 'undefined') {
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      xhr = null;
    }
    return xhr;
  }

  executeOnSignedUrl(file, callback) {
    const normalizedFileName =
      file.name.replace(/[!^`><{}[\]()*#%'"~|&@:;$=+?\s\\/\x00-\x1F\x7f’]+/ig, '_')
      .normalize('NFC');

    let queryString = `?objectName=${normalizedFileName}&contentType=${encodeURIComponent(file.type)}`;
    if (this.signingUrlQueryParams) {
      const signingUrlQueryParams = this.signingUrlQueryParams;
      Object.keys(signingUrlQueryParams).forEach((key) => {
        const val = signingUrlQueryParams[key];
        queryString += `&${key}=${val}`;
      });
    }
    const xhr = this.createCORSRequest('GET', this.server + this.signingUrl + queryString);
    if (this.signingUrlHeaders) {
      const signingUrlHeaders = this.signingUrlHeaders;
      Object.keys(signingUrlHeaders).forEach((key) => {
        const val = signingUrlHeaders[key];
        xhr.setRequestHeader(key, val);
      });
    }
    xhr.overrideMimeType && xhr.overrideMimeType('text/plain; charset=x-user-defined');
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        let result;
        try {
          result = JSON.parse(xhr.responseText);
        } catch (error) {
          this.onError('Invalid response from server', file);
          return false;
        }
        return callback(result);
      }
    };
    return xhr.send();
  }

  uploadToS3(file, signResult) {
    const xhr = this.createCORSRequest('PUT', signResult.signedUrl);
    if (!xhr) {
      this.onError('CORS not supported', file);
    } else {
      xhr.onload = () => {
        if (xhr.status === 200) {
          this.onProgress(100, 'Upload completed', file);
          return this.onFinishS3Put(signResult, file);
        } else {
          return this.onError(`Upload error: ${xhr.status}`, file);
        }
      };
      xhr.onerror = () => this.onError('XHR error', file);
      xhr.upload.onprogress = e => {
        let percentLoaded;
        if (e.lengthComputable) {
          percentLoaded = Math.round((e.loaded / e.total) * 100);
          return this.onProgress(percentLoaded, percentLoaded === 100 ? 'Finalizing' : 'Uploading', file);
        }
      };
    }

    xhr.setRequestHeader('Content-Type', file.type);

    if (this.contentDisposition) {
      let disposition = this.contentDisposition;
      if (disposition === 'auto') {
        if (file.type.substr(0, 6) === 'image/') {
          disposition = 'inline';
        } else {
          disposition = 'attachment';
        }
      }

      const normalizedFileName =
        file.name.replace(/[!^`><{}[\]()*#%'"~|&@:;$=+?\s\\/\x00-\x1F\x7f]+/ig, '_')
        .normalize('NFC');

      xhr.setRequestHeader('Content-Disposition', `${disposition}; filename=${normalizedFileName}`);
    }

    if (this.uploadRequestHeaders) {
      const uploadRequestHeaders = this.uploadRequestHeaders;
      Object.keys(uploadRequestHeaders).forEach((key) => {
        const val = uploadRequestHeaders[key];
        xhr.setRequestHeader(key, val);
      });
    } else {
      xhr.setRequestHeader('x-amz-acl', 'public-read');
    }
    this.httprequest = xhr;
    return xhr.send(file);
  }

  uploadFile(file) {
    const uploadToS3Callback = this.uploadToS3.bind(this, file);

    if (this.getSignedUrl) {
      return this.getSignedUrl(file, uploadToS3Callback);
    }
    return this.executeOnSignedUrl(file, uploadToS3Callback);
  }

  abortUpload() {
    this.httprequest && this.httprequest.abort();
  }
}

S3Upload.prototype.server = '';
S3Upload.prototype.signingUrl = '/sign-s3';
S3Upload.prototype.fileElement = null;
S3Upload.prototype.files = null;

S3Upload.prototype.onFinishS3Put = (signResult, file) => console.log('base.onFinishS3Put()', signResult.publicUrl);

S3Upload.prototype.preprocess = (file, next) => {
  console.log('base.preprocess()', file);
  return next(file);
};

S3Upload.prototype.onProgress = (percent, status, file) => console.log('base.onProgress()', percent, status);

S3Upload.prototype.onError = (status, file) => console.log('base.onError()', status);


export default S3Upload;

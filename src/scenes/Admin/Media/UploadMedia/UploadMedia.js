/* @flow */
import React from 'react';
import Helmet from 'react-helmet';
import UploadComputer from './UploadComputer';

const UploadMedia = () => {
  return (
    <div>
      <Helmet title="Upload Media" />
      <UploadComputer />
    </div>
  );
};

export default UploadMedia;

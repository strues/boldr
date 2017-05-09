/* @flow */
import React from 'react';
import Helmet from 'react-helmet';

import UploadUrl from './UploadUrl';
import UploadComputer from './UploadComputer';

const UploadMedia = () => {
  return (
    <div>
      <Helmet title="Upload Media" />
      <UploadUrl />
      <UploadComputer />
    </div>
  );
};

export default UploadMedia;

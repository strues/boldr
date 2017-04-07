/* @flow */
import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Grid, Row, Col } from 'boldr-ui';

import config from '../../../../../../../config';
import File from '../File';
import FileListItem from '../FileListItem';

type Props = {
  selectFile: Function,
  removeMedia: Function,
  files: Array<Object>,
};

const FileListView = (props: Props) => {
  return (
    <div className="boldr-filemanager__list">
      {props.files.map(file => (
        <FileListItem
          key={ file.id }
          imgSrc={ `${config('apiUrl')}${file.url}` }
          removeMedia={ props.removeMedia }
          selectFile={ props.selectFile }
          file={ file }
        >
          {file.fileName}
        </FileListItem>
      ))}
    </div>
  );
};

export default FileListView;

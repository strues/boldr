/* @flow */
import React, { PropTypes } from 'react';
import styled from 'styled-components';

import { Grid, Row, Col } from '../../../../../components';
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
      {
        props.files.map((file) =>
        <FileListItem
          key={ file.id }
          imgSrc={ file.url }
          removeMedia={ props.removeMedia }
          selectFile={ props.selectFile }
          file={ file }
        >
          { file.file_name }
        </FileListItem>,
        )
       }
    </div>
  );
};

export default FileListView;

/* @flow */
import React from 'react';
import styled from 'styled-components';

import { Grid, Row, Col } from 'boldr-ui';
import File from '../File';

type Props = {
  selectFile: Function,
  removeMedia: Function,
  files: Array<Object>,
};

const FileCardView = (props: Props) => {
  return (
    <Grid fluid>
      <Row>
        {props.files.map(file => (
          <Col sm={12} md={4} lg={3} key={file.id}>
            <File
              file={file}
              removeMedia={props.removeMedia}
              selectFile={props.selectFile}
            />
          </Col>
        ))}
      </Row>
    </Grid>
  );
};

export default FileCardView;

/* @flow */
import React, { PropTypes } from 'react';
import styled from 'styled-components';

import { Grid, Row, Col } from '../../../../../components';
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
        {
          props.files.map((file) =>
          <Col sm={ 12 } md={ 4 } lg={ 3 } key={ file.id }>
            <File file={ file } removeMedia={ props.removeMedia } selectFile={ props.selectFile } />
          </Col>)
         }
       </Row>
     </Grid>
  );
};

FileCardView.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    filename: PropTypes.string,
    url: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  removeMedia: PropTypes.func,
};

export default FileCardView;

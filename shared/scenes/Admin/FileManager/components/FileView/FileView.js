import React, { PropTypes } from 'react';
import { Row, Col } from '../../../../../components/Layout';
import File from '../File';

const FileView = props => {
  return (
    <div style={ { paddingTop: '15px' } }>
      <Row>
        {
          props.files.map((file) =>
          <Col key={ file.id } xs={ 12 } md={ 4 }>
            <File file={ file } removeMedia={ props.removeMedia } selectFile={ props.selectFile } />
          </Col>)
         }
      </Row>
    </div>
  );
};

FileView.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    filename: PropTypes.string,
    url: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  removeMedia: PropTypes.func,
};

export default FileView;

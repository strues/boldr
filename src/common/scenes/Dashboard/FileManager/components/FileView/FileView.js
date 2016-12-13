import React, { PropTypes } from 'react';
import { Row } from 'components/index';
import File from '../File';

const FileView = props => {
  return (
    <div style={ { paddingTop: '15px' } }>
      <Row>
        {
          props.files.map((file, i) =>
          <File key={ i } file={ file } removeMedia={ props.removeMedia } />)
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

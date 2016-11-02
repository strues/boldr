import React, { PropTypes } from 'react';
import { Grid } from 'semantic-ui-react';
import File from '../File';

const { Column, Row } = Grid;

const FileView = props => {
  return (
      <Grid>
      <Row columns={ 4 }>
        {
          props.files.map((file, i) =>
          <File key={ i } file={ file } removeMedia={ props.removeMedia } />)
         }
         </Row>
      </Grid>
  );
};

FileView.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    filename: PropTypes.string,
    url: PropTypes.string.isRequired
  }).isRequired).isRequired,
  removeMedia: PropTypes.func
};

export default FileView;

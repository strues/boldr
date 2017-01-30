/* @flow */
import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Row, Col } from '../../../../../components/Layout';
import File from '../File';

const CardGroup = styled.section`
  display: flex;
  overflow: hidden;
`;
const CardGroupCard = styled.div`
  flex: 1 1 0;
  border: none;
  border-radius: 0;
  margin-left: 10px;
  margin-right: 10px;
`;

type Props = {
  selectFile: Function,
  removeMedia: Function,
  files: Array<Object>,
};

const FileView = (props: Props) => {
  return (
      <CardGroup>
        {
          props.files.map((file) =>
          <CardGroupCard key={ file.id }>
            <File file={ file } removeMedia={ props.removeMedia } selectFile={ props.selectFile } />
          </CardGroupCard>)
         }
       </CardGroup>
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

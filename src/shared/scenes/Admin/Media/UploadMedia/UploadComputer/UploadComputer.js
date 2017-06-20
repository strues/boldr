/* @flow */
import React, { Component } from 'react';
import styled from 'styled-components';
import { graphql, gql } from 'react-apollo';
import IconButton from 'material-ui/IconButton';
import UploadFile from 'material-ui-icons/FileUpload';
import { Row, Col } from '~components/Layout';
import Paper from '~components/Paper';
import Headline from '~components/Headline';
import Icon from '~components/Icons';
import { connect } from 'react-redux';

type Props = {
  uploadMediaFile: () => void,
  dispatch: () => void,
  dropzone: () => void,
};

type State = {
  files: Array<Object>,
  file: Object,
  percentComplete: number,
  uploadIsComplete: boolean,
};

const MediaTitleArea = styled.div`
  padding-top: 50px;
  margin-bottom: 35px;
`;

class UploadComputer extends Component {
  handleChange = ({ target }) => {
    if (target.validity.valid) {
      this.props.mutate({
        variables: {
          file: target.files[0],
        },
      });
    }
  };
  render() {
    return (
      <Row center="xs">
        <Col xs={6}>
          <Paper zDepth={1}>
            <MediaTitleArea>
              <Headline type="h2">
                <Icon kind="folder-upload" color="rgba(0, 188, 212, 1.00)" size="36" />
                {' '}
                Upload from your computer
              </Headline>
            </MediaTitleArea>

            <input type="file" required onChange={this.handleChange} />
            {/* <div className="boldrui-dropzone__footer">
              <IconButton
                onTouchTap={() => {
                  (this: any).dropzone.open();
                }}
              >
                <UploadFile />
              </IconButton>
            </div> */}
          </Paper>
        </Col>
      </Row>
    );
  }
}

export default graphql(gql`
  mutation uploadMedia ($file: UploadMediaInput!) {
    uploadMedia (file: $file) {
      id
      name
      type
      path
    }
  }
`)(UploadComputer);

/* @flow */
import React, { Component } from 'react';
import styled from 'styled-components';
import { graphql, gql } from 'react-apollo';
import IconButton from 'material-ui/IconButton';
import UploadFile from 'material-ui-icons/FileUpload';
import { connect } from 'react-redux';

import { Row, Col } from '~components/Layout';
import Paper from '~components/Paper';
import Headline from '~components/Headline';
import Icon from '~components/Icons';

type Props = {
  uploadMediaFile: () => void,
  dispatch: () => void,
  mutate: () => void,
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
  props: Props;
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

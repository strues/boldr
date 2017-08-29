/* @flow */
import React, { Component } from 'react';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import Helmet from 'react-helmet';
import { Row, Col } from '@boldr/ui/Layout';
import Paper from '@boldr/ui/Paper';
import Headline from '@boldr/ui/Headline';
import Upload from '@boldr/icons/Upload';
import GET_MEDIA_QUERY from '../gql/getMedia.graphql';
import UPLOAD_MEDIA_MUTATION from '../gql/uploadMedia.graphql';
import Dropzone from './components/Dropzone';

const MediaTitleArea = styled.div`
  padding-top: 50px;
  margin-bottom: 35px;
`;

const MediaInputArea = styled.div`padding-bottom: 50px;`;

export type Props = {
  mutate: () => void,
};

class UploadMedia extends Component<Props, *> {
  handleUpload = file => {
    return new Promise((resolve, reject) => {
      this.props
        .mutate({
          variables: {
            file,
          },
          refetchQueries: [
            {
              query: GET_MEDIA_QUERY,
              variables: {
                offset: 0,
                limit: 20,
              },
            },
          ],
        })
        .then(data => {
          return resolve(data);
        })
        .catch(err => reject(err));
    });
  };

  props: Props;
  render() {
    return (
      <div>
        <Helmet title="Upload Media" />
        <Row xsCenter>
          <Col xs={6}>
            <Paper zDepth={1}>
              <MediaTitleArea>
                <Headline type="h2">
                  <Upload stroke="rgba(0, 188, 212, 1.00)" size="36" /> Upload from your computer
                </Headline>
              </MediaTitleArea>
              <MediaInputArea>
                <Dropzone
                  uploadCallback={this.handleUpload}
                  fileUrl="http://localhost:2121/uploads/media"
                />
              </MediaInputArea>
            </Paper>
          </Col>
        </Row>
      </div>
    );
  }
}
// $FlowIssue
export default graphql(UPLOAD_MEDIA_MUTATION)(UploadMedia);

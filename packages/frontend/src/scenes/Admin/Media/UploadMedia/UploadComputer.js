/* @flow */
import React, { Component } from 'react';
import styled from 'styled-components';
import { graphql } from 'react-apollo';

import { Row, Col } from '@boldr/ui/Layout';
import Paper from '@boldr/ui/Paper';
import Headline from '@boldr/ui/Headline';
import Icon from '@boldr/ui/Icons';
import GET_MEDIA_QUERY from '../gql/getMedia.graphql';
import UPLOAD_MEDIA_MUTATION from '../gql/uploadMedia.graphql';

export type Props = {
  mutate: () => void,
};

const MediaTitleArea = styled.div`
  padding-top: 50px;
  margin-bottom: 35px;
`;

const MediaInputArea = styled.div`padding-bottom: 50px;`;

class UploadComputer extends Component {
  handleChange = ({ target }) => {
    if (target.validity.valid) {
      this.props.mutate({
        variables: {
          file: target.files[0],
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
      });
    }
  };
  props: Props;
  render() {
    return (
      <Row xsCenter>
        <Col xs={6}>
          <Paper zDepth={1}>
            <MediaTitleArea>
              <Headline type="h2">
                <Icon kind="folder-upload" color="rgba(0, 188, 212, 1.00)" size="36" /> Upload from
                your computer
              </Headline>
            </MediaTitleArea>
            <MediaInputArea>
              <input type="file" required onChange={this.handleChange} />
            </MediaInputArea>
          </Paper>
        </Col>
      </Row>
    );
  }
}

export default graphql(UPLOAD_MEDIA_MUTATION)(UploadComputer);

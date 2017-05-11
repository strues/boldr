/* @flow */
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Row, Col, Block, Headline, Icon } from 'boldr-ui';
import { uploadMediaUrl } from '../../../../../state/modules/media/actions';
import UploadUrlForm from './UploadUrlForm';

const MediaTitleArea = styled.div`
  margin-bottom: 35px;
`;

type Props = {
  uploadMediaUrl: () => void,
};
class UploadUrl extends Component {
  handleSubmit = values => {
    const payload = values;

    this.props.uploadMediaUrl(payload);
  };
  props: Props;
  render() {
    return (
      <Row xsCenter>
        <Col xs={6}>
          <Block>
            <MediaTitleArea>
              <Headline type="h2">
                <Icon
                  kind="folder-upload"
                  color="rgba(0, 188, 212, 1.00)"
                  size="36"
                />
                {' '}
                Upload from the Internet
              </Headline>
            </MediaTitleArea>
            <UploadUrlForm onSubmit={this.handleSubmit} />
          </Block>
        </Col>
      </Row>
    );
  }
}

export default connect(null, { uploadMediaUrl })(UploadUrl);

/* @flow */
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Col, Row } from '@@components/Layout';
import Headline from '@@components/Headline';
import Block from '@@components/Block';
import Icon from '@@components/Icons';

import { uploadMediaUrl } from '../../../state/media/actions';
import UploadUrlForm from './UploadUrlForm';

const MediaTitleArea = styled.div`
  margin-bottom: 35px;
`;

type Props = {
  dispatch: () => void,
};
class UploadUrl extends Component {
  handleSubmit = values => {
    const payload = values;

    this.props.dispatch(uploadMediaUrl(payload));
  };
  props: Props;
  render() {
    return (
      <Row center="xs">
        <Col xs={6}>
          <Block>
            <MediaTitleArea>
              <Headline type="h2">
                <Icon kind="folder-upload" color="rgba(0, 188, 212, 1.00)" size="36" />
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

export default connect()(UploadUrl);

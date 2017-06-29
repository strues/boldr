/* @flow */
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Col, Row } from '@boldr/ui/Layout';
import Headline from '@boldr/ui/Headline';
import Block from '@boldr/ui/Block';
import Icon from '@boldr/ui/Icons';

import { uploadMediaUrl } from '../../../state/media/actions';
import UploadUrlForm from './UploadUrlForm';

const MediaTitleArea = styled.div`margin-bottom: 35px;`;

export type Props = {
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
      <Row xsCenter>
        <Col xs={6}>
          <Block>
            <MediaTitleArea>
              <Headline type="h2">
                <Icon kind="folder-upload" color="rgba(0, 188, 212, 1.00)" size="36" /> Upload from
                the Internet
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

/* @flow */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Col, Row } from '@boldr/ui/Layout';
import ResponsiveImage from '@boldr/ui/ResponsiveImage';
import Block from '@boldr/ui/Block';
import Headline from '@boldr/ui/Headline';
import Loader from '@boldr/ui/Loader';
// form
import MediaForm from './components/MediaForm';

type Props = {
  data: Data,
  editMediaFile: Function,
};
type Data = {
  getMediaById: MediaFile,
  loading: boolean,
};

const MediaContent = styled.div`
  padding-top: 3rem;
  margin-bottom: 4rem;
`;
const MediaFormCard = styled.div`margin-bottom: 2rem;`;

class MediaManager extends Component {
  handleSubmit = (values: Object) => {
    const mediaId = this.props.data.getMediaById.id;

    this.props.editMediaFile(mediaId, values);
  };
  props: Props;
  render() {
    const { getMediaById, loading } = this.props.data;

    if (loading) {
      return <Loader />;
    }
    return (
      <div>
        <Row>
          <Col xs={12}>
            <Row xsCenter>
              <Col xs={6}>
                <MediaContent>
                  <ResponsiveImage
                    src={getMediaById.url}
                    width={640}
                    height={420}
                    alt={getMediaById.name}
                  />
                </MediaContent>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Row xsCenter>
              <Col xs={8}>
                <MediaFormCard>
                  <Block>
                    <Headline type="h2">Edit media attributes</Headline>
                    <MediaForm initialValues={getMediaById} onSubmit={this.handleSubmit} />
                  </Block>
                </MediaFormCard>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MediaManager;

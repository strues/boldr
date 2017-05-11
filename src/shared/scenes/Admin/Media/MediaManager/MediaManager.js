/* @flow */
import React, { Component } from 'react';
import { Zoom } from 'animate-components';
import styled from 'styled-components';
import { Photo, Grid, Col, Row, Block, Headline } from 'boldr-ui';
import MediaForm from './components/MediaForm';

type Props = {
  media: MediaFile,
  editMedia: () => void,
};
const MediaContent = styled.div`
  padding-top: 3rem;
  margin-bottom: 4rem;
`;
const MediaFormCard = styled.div`
  margin-bottom: 2rem;
`;
class MediaManager extends Component {
  handleSubmit = (values: Object) => {
    const mediaData = {
      id: this.props.media.id,
      fileName: values.fileName,
      fileDescription: values.fileDescription,
    };
    this.props.editMedia(mediaData);
  };
  props: Props;
  render() {
    const { media } = this.props;
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
              <Row xsCenter>
                <Col xs={6}>
                  <MediaContent>
                    <Zoom duration="1s">
                      <Photo src={media.url} />
                    </Zoom>
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
                      <MediaForm
                        initialValues={media}
                        onSubmit={this.handleSubmit}
                      />
                    </Block>
                  </MediaFormCard>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default MediaManager;

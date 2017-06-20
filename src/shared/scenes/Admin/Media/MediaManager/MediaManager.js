/* @flow */
import React, { Component } from 'react';
import styled from 'styled-components';
import { gql, graphql } from 'react-apollo';
// internal
import { Grid, Col, Row } from '@@components/Layout';
import Photo from '@@components/Photo';
import Block from '@@components/Block';
import Headline from '@@components/Headline';
import Loader from '@@components/Loader';
import MediaForm from './components/MediaForm';

type Props = {
  data: Data,
  editMedia: () => void,
};
type Data = {
  getMediaById: MediaFile,
  loading: boolean,
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
      id: this.props.data.getMediaById.id,
      fileName: values.fileName,
      fileDescription: values.fileDescription,
    };
    this.props.editMedia(mediaData);
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
            <Row center="xs">
              <Col xs={6}>
                <MediaContent>

                  <Photo src={getMediaById.url} />

                </MediaContent>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Row center="xs">
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

export const MEDIA_BY_ID_QUERY = gql`
  query getMediaById($id: UUID!) {
      getMediaById(id: $id) {
        id,
        fileName,
        thumbName,
        fileDescription,
        url,
      }
  }
`;

const MediaManagerWithData = graphql(MEDIA_BY_ID_QUERY, {
  options: props => ({
    variables: {
      id: props.match.params.id,
    },
  }),
})(MediaManager);
export default MediaManagerWithData;

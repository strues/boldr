/* @flow */
import React, { Component } from 'react';
import styled from 'styled-components';
import { compose, gql, graphql } from 'react-apollo';
// internal
import { Grid, Col, Row } from '@boldr/ui/Layout';
import Photo from '@boldr/ui/Photo';
import Block from '@boldr/ui/Block';
import Headline from '@boldr/ui/Headline';
import Loader from '@boldr/ui/Loader';
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
const MediaFormCard = styled.div`
  margin-bottom: 2rem;
`;

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

                  <Photo src={getMediaById.url} />

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

export const MEDIA_BY_ID_QUERY = gql`
  query getMediaById($id: UUID!) {
      getMediaById(id: $id) {
        id,
        name,
        thumbName,
        fileDescription,
        url,
      }
  }
`;

export const EDIT_MEDIA_MUTATION = gql`
  mutation editMedia($id: UUID!, $input: EditMediaInput!) {
    editMedia(id: $id, input: $input) {
      name
      fileDescription
    }
  }
`;
const MediaManagerWithData = compose(
  graphql(MEDIA_BY_ID_QUERY, {
    options: props => ({
      variables: {
        id: props.match.params.id,
      },
    }),
  }),
  graphql(EDIT_MEDIA_MUTATION, {
    props: ({ mutate }) => ({
      editMediaFile: (mediaId, values) =>
        mutate({
          variables: {
            id: mediaId,
            input: {
              name: values.name,
              fileDescription: values.fileDescription,
            },
          },
        }),
    }),
  }),
)(MediaManager);
export default MediaManagerWithData;

/* @flow */
import React, { Component } from 'react';

import styled from 'styled-components';
import { gql, graphql } from 'react-apollo';
import { Photo, Grid, Col, Row, Block, Headline, Loader } from 'boldr-ui';
import MediaForm from './components/MediaForm';

type Props = {
  data: Data,
  editMedia: () => void,
};
type Data = {
  mediaById: MediaFile,
  loading: boolean,
};

const MediaContent = styled.div`
  padding-top: 3rem;
  margin-bottom: 4rem;
`;
const MediaFormCard = styled.div`
  margin-bottom: 2rem;
`;

export class MediaManager extends Component {
  handleSubmit = (values: Object) => {
    const mediaData = {
      id: this.props.data.mediaById.id,
      fileName: values.fileName,
      fileDescription: values.fileDescription,
    };
    this.props.editMedia(mediaData);
  };
  props: Props;
  render() {
    const { mediaById, loading } = this.props.data;

    if (loading) {
      return <Loader />;
    }
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
              <Row xsCenter>
                <Col xs={6}>
                  <MediaContent>

                      <Photo src={mediaById.url} />

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
                        initialValues={mediaById}
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

export const MEDIA_BY_ID_QUERY = gql`
  query media($id: UUID!) {
      mediaById(id: $id) {
        id,
        fileName,
        thumbName,
        fileDescription,
        url,
      }
  }
`;

export default graphql(MEDIA_BY_ID_QUERY, {
  options: props => ({
    variables: {
      id: props.match.params.id,
    },
  }),
})(MediaManager);

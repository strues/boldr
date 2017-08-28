/* @flow */
/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';
import Helmet from 'react-helmet';
import { graphql, gql } from 'react-apollo';
import update from 'immutability-helper';
import styled from 'styled-components';
import { ImageDisplay, Col, Row, Headline } from '@boldr/ui';
import DELETE_MEDIA from './gql/deleteMedia.graphql';

type Props = {
  media: Array<Object>,
  deleteMedia: () => void,
  imageUpdateClick: () => void,
};
const MediaList = styled.ul`
  flex-flow: row wrap;
  list-style-type: none;
  display: flex;
  padding: .3rem;
`;
const MediaItem = styled.li`
  align-items: stretch;
  box-sizing: border-box;
  column-break-inside: avoid;
  counter-increment: item;
  display: flex;
  justify-content: center;
  padding: .5rem .7rem;
`;

const MediaSidePanel = styled.div`
  background-color: #00b4d0;
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

class Media extends React.Component<Props, *> {
  handleClick = m => {
    this.props.imageUpdateClick(m);
  };
  props: Props;
  render() {
    const { media, deleteMedia } = this.props;
    return (
      <div>
        <Helmet title="Media" />
        <Row>
          <Col xs={12}>
            <Headline type="h2">Media Gallery</Headline>
            <Row>
              <MediaList>
                {media.map(m =>
                  <MediaItem key={m.id}>
                    <ImageDisplay
                      onRemoveImage={deleteMedia(m.id)}
                      onUpdateImage={() => {
                        this.handleClick(m);
                      }}
                      imageSrc={`http://localhost:2121/uploads/media/${m.thumbName}`}
                    />
                  </MediaItem>,
                )}
              </MediaList>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default graphql(DELETE_MEDIA, {
  props: ({ mutate }) => ({
    deleteMedia(id) {
      return () =>
        mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteMedia: {
              id,
              message: `Deleted media ${id}`,
              __typename: 'Media',
            },
          },
          refetchQueries: [
            {
              query: gql`
                query getMedia($offset: Int!, $limit: Int!) {
                  getMedia(offset: $offset, limit: $limit) {
                    id
                    thumbName
                    name
                    url
                    fileDescription
                  }
                }
              `,
              variables: {
                offset: 0,
                limit: 20,
              },
            },
          ],
        });
    },
  }),
})(Media);

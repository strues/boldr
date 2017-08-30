/* @flow */
/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';
import Helmet from 'react-helmet';
import { graphql, gql, compose } from 'react-apollo';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ImageDisplay, Col, Row, Headline } from '@boldr/ui';
import type { MediasType, MediaType } from '../../../types/boldr';

import DELETE_MEDIA from './gql/deleteMedia.graphql';

type Props = {
  media: MediasType,
  deleteMedia: string => void,
  imageUpdateClick: () => void,
};
const MediaList = styled.ul`
  flex-flow: row wrap;
  list-style-type: none;
  display: flex;
  padding: 0.3rem;
`;
const MediaItem = styled.li`
  align-items: stretch;
  box-sizing: border-box;
  column-break-inside: avoid;
  counter-increment: item;
  display: flex;
  justify-content: center;
  padding: 0.5rem 0.7rem;
`;

class Media extends React.Component<Props, *> {
  imageUpdateClick = (m: MediaType) => {
    this.props.navigate(`/admin/media/${m.id}`);
  };
  render(): React.Node {
    const { media, deleteMedia } = this.props;
    return (
      <div>
        <Helmet title="Media" />
        <Row>
          <Col xs={12}>
            <Headline type="h2" text="Media Gallery" />
            <Row>
              <MediaList>
                {media.map(m => (
                  <MediaItem key={m.id}>
                    <ImageDisplay
                      onRemoveImage={deleteMedia(m.id)}
                      onUpdateImage={() => {
                        this.imageUpdateClick(m);
                      }}
                      // $FlowIssue
                      imageSrc={`${process.env.API_URL}/uploads/media/${m.thumbName}`}
                    />
                  </MediaItem>
                ))}
              </MediaList>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ navigate: url => dispatch(push(url)) }, dispatch);
}

export default compose(
  // $FlowIssue
  graphql(DELETE_MEDIA, {
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
            // $FlowIssue
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
  }),
  // $FlowIssue
  connect(null, mapDispatchToProps),
)(Media);

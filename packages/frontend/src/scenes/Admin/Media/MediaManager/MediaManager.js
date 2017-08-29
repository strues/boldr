/* @flow */
import * as React from 'react';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import { Col, Row } from '@boldr/ui/Layout';
import ResponsiveImage from '@boldr/ui/ResponsiveImage';
import Block from '@boldr/ui/Block';
import Headline from '@boldr/ui/Headline';
import Loader from '@boldr/ui/Loader';
import type { MediaType } from '../../../../types/boldr';
import EDIT_MEDIA_MUTATION from '../gql/editMedia.graphql';
// form
import MediaForm from './components/MediaForm';

type Props = {
  media: MediaType,
  isLoading: boolean,
  editMediaFile: Function,
};

const MediaContent = styled.div`
  padding-top: 3rem;
  margin-bottom: 4rem;
`;
const MediaFormCard = styled.div`margin-bottom: 2rem;`;

class MediaManager extends React.Component<Props, *> {
  handleSubmit = (values: Object) => {
    const mediaId = this.props.media.id;

    this.props.editMediaFile(mediaId, values);
  };
  props: Props;
  render() {
    const { media, isLoading } = this.props;

    if (isLoading) {
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
                    // $FlowIssue
                    src={`${process.env.API_URL}/${media.url}`}
                    width={640}
                    height={420}
                    alt={media.name}
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
                    <MediaForm initialValues={media} onSubmit={this.handleSubmit} />
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
// $FlowIssue
export default graphql(EDIT_MEDIA_MUTATION, {
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
  // $FlowIssue
})(MediaManager);

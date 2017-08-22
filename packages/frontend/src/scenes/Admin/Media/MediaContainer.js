/* @flow */
/* eslint-disable react/prefer-stateless-function, no-unused-vars */
import * as React from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { bindActionCreators } from 'redux';
import Loader from '@boldr/ui/Loader';
import { replacePath } from '@boldr/core';
import Media from './Media';
import MEDIA_QUERY from './gql/getMedia.graphql';

type Props = {
  data: Data,
  navigate: () => void,
};

type Data = {
  getMedia: Array<Media>,
  loading: boolean,
};

export class MediaContainer extends React.Component<Props, *> {
  props: Props;

  imageUpdateClick = (m: Media) => {
    this.props.navigate(`/admin/media/${m.id}`);
  };
  render() {
    const { loading, getMedia } = this.props.data;
    if (loading) {
      return <Loader />;
    }
    return <Media media={getMedia} imageUpdateClick={this.imageUpdateClick} />;
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ navigate: url => dispatch(replacePath(url)) }, dispatch);
}

const MediaContainerWithData = graphql(MEDIA_QUERY, {
  options: props => ({
    variables: {
      offset: 0,
      limit: 20,
    },
  }),
})(MediaContainer);
// $FlowIssue
export default connect(null, mapDispatchToProps)(MediaContainerWithData);

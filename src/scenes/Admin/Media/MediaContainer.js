/* @flow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { bindActionCreators } from 'redux';
import Loader from '@boldr/ui/Loader';
import { replacePath } from '../../../core/RouterConnection';
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

export class MediaContainer extends Component {
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
  options: () => ({
    variables: {
      offset: 0,
      limit: 20,
    },
  }),
})(MediaContainer);
// $FlowIssue
export default connect(null, mapDispatchToProps)(MediaContainerWithData);

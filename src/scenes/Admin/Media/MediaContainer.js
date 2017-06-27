/* @flow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {push } from 'react-router-redux';
import { gql, graphql } from 'react-apollo';
import { bindActionCreators } from 'redux';
import Loader from '@boldr/ui/Loader';

import Media from './Media';

type Props = {
  data: Data,
  navigate: () => void,
  dispatch: Function,
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
  return bindActionCreators({ navigate: url => dispatch(push(url)) }, dispatch);
}

export const MEDIA_QUERY = gql`
query getMedia($offset: Int!, $limit: Int!) {
      getMedia(offset:$offset,limit:$limit) {
        id,
        thumbName,
        name,
        url,
        fileDescription,
      }
  }
`;

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

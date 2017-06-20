/* @flow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { bindActionCreators } from 'redux';
import Loader from '~components/Loader';
import { getMediaType, toggleMedia } from '../state/media';

import Media from './Media';

type Props = {
  data: Data,
  toggleMedia: () => void,
  dispatch: Function,
};

type Data = {
  getMedia: Array<Object>,
  loading: boolean,
};

export class MediaContainer extends Component {
  props: Props;

  render() {
    const { loading, getMedia } = this.props.data;
    if (loading) {
      return <Loader />;
    }
    return <Media media={getMedia} />;
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleMedia }, dispatch);
}

const MEDIA_QUERY = gql`
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

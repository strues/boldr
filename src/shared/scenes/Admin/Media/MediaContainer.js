/* @flow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMediaIfNeeded } from '../../../state/modules/media/actions';
import Media from './Media';

type Props = {
  members: Object,
  dispatch: Function,
  fetchMediaIfNeeded: () => {},
  updateMember: Function,
  hideModal: () => void,
  showModal: () => void,
  ui: Object,
};

export class MediaContainer extends Component {
  static defaultProps: {
    profile: {},
    fetchMediaIfNeeded: () => {},
  };

  componentDidMount() {
    this.props.dispatch(fetchMediaIfNeeded());
  }
  props: Props;

  render() {
    return <Media />;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ui: state.boldr.ui,
    media: state.boldr.media,
  };
};

export default connect(mapStateToProps)(MediaContainer);

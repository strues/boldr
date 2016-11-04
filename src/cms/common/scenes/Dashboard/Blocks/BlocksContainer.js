/* @flow */
import React, { Component } from 'react';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { areBlocksLoaded, fetchBlocks } from './reducer';
import Blocks from './components/Blocks';

type Props = {
  fetchBlocks: () => void
}

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    if (!areBlocksLoaded(getState())) {
      promises.push(dispatch(fetchBlocks()));
    }
    return Promise.all(promises);
  },
}])
class BlocksContainer extends Component {
  componentDidMount() {
    this.props.fetchBlocks();
  }
  props: Props;
  render() {
    return (
      <div>
        <Blocks { ...this.props } />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    blocks: state.blocks,
  };
};
export default connect(mapStateToProps, { fetchBlocks })(BlocksContainer);

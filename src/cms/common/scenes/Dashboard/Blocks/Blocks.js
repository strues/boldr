import React, { Component } from 'react';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { areBlocksLoaded, fetchBlocks } from './reducer';
@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    if (!areBlocksLoaded(getState())) {
      promises.push(dispatch(fetchBlocks()));
    }
    return Promise.all(promises);
  },
}])
class Blocks extends Component {
  componentDidMount() {
    this.props.fetchBlocks();
  }
  render() {
    return (
      <div>
      blcoks
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    blocks: state.blocks,
  };
};
export default connect(mapStateToProps, { fetchBlocks })(Blocks);

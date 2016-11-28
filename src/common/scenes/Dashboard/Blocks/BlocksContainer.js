/* @flow */
import React, { Component } from 'react';
import { asyncConnect } from 'redux-connect';
import type { Block as BlockType } from 'types/models';
import getDndContext from 'core/utils/dndContext';
import { areBlocksLoaded, fetchBlocks, createBlock } from './reducer';
import Blocks from './components/Blocks';

type Props = {
  fetchBlocks: () => void,
  handleCreateBlock: () => void,
  createBlock: () => void,
  blocks: Object,
  all: Array<BlockType>,
}

class BlocksContainer extends Component {
  constructor() {
    super();

    (this: any).handleCreateBlock = this.handleCreateBlock.bind(this);
  }
  props: Props;
  handleCreateBlock(values) {
    this.props.createBlock(values);
  }
  render() {
    return (
      <div>
        <Blocks blocks={ this.props.blocks.all } handleSubmit={ this.handleCreateBlock } />
      </div>
    );
  }
}
const asyncProps = [{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    if (!areBlocksLoaded(getState())) {
      promises.push(dispatch(fetchBlocks()));
    }
    return Promise.all(promises);
  },
}];
const mapStateToProps = (state) => {
  return {
    blocks: state.blocks,
  };
};
export default asyncConnect(asyncProps, mapStateToProps, { fetchBlocks, createBlock })(BlocksContainer);

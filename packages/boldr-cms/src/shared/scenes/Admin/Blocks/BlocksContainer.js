/* @flow */
import React, { Component } from 'react';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import type { Block as BlockType } from 'types/models';
import { fetchBlocks, createBlock } from './reducer';
import Blocks from './Blocks';

type Props = {
  fetchBlocks: () => void,
  handleCreateBlock: () => void,
  createBlock: () => void,
  blocks: Object,
  all: Array<BlockType>,
}

@provideHooks({
  fetch: ({ dispatch }) => {
    return dispatch(fetchBlocks());
  },
})
export class BlocksContainer extends Component {
  constructor() {
    super();

    (this: any).handleCreateBlock = this.handleCreateBlock.bind(this);
  }
  componentDidMount() {
    this.props.fetchBlocks();
  }
  props: Props;
  handleCreateBlock(values) {
    console.log(values)
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

const mapStateToProps = (state) => {
  return {
    blocks: state.blocks,
  };
};
export default connect(mapStateToProps, { fetchBlocks, createBlock })(BlocksContainer);

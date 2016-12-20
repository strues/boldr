/* @flow */
import React from 'react';
import { Col, Row } from 'components/index';
import Paper from 'material-ui/Paper';
import type { Block as BlockType } from 'types/models';
import { Block, CreateBlockForm } from '../';

type Props = {
  handleSubmit: () => void,
  blocks: Array<BlockType>
};
const Blocks = (props: Props) => {
  return (
    <div>
    <Row>
      <Col xs={ 12 } md={ 8 }>
         <Paper zDepth={ 1 }>
           Blocks
           { !(props.blocks: Array<BlockType>) ?
             <div>Loading</div> :
             props.blocks.map(block => <Block key={ block.id } block={ block } />)
           }
         </Paper>
      </Col>
      <Col xs={ 12 } md={ 4 }>
        <Paper zDepth={ 1 }>
        <CreateBlockForm onSubmit={ props.handleSubmit } />
      </Paper>
      </Col>
      </Row>
    </div>
  );
};

export default Blocks;

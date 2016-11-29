/* @flow */
import React from 'react';
import { Grid, Col, Row } from 'components/index';
import { Menu, Message, Segment, Icon, Button } from 'semantic-ui-react';
import type { Block as BlockType } from 'types/models';
import { Block, CreateBlockForm } from './components';

type Props = {
  handleSubmit: () => void,
  blocks: Array<BlockType>
};
const Blocks = (props: Props) => {
  return (
    <div>
      <Message
        icon="lab"
        header="Build something bold."
        content="Blocks are content elements, the foundation of your website."
      />
    <Row>
      <Col xs={ 12 } md={ 8 }>
         <Segment>
           Blocks
           { !(props.blocks: Array<BlockType>) ?
             <div>Loading</div> :
             props.blocks.map(block => <Block key={ block.id } block={ block } />)
           }
         </Segment>
      </Col>
      <Col xs={ 12 } md={ 4 }>
        <Segment>
        <CreateBlockForm onSubmit={ props.handleSubmit } />
      </Segment>
      </Col>
      </Row>
    </div>
  );
};

export default Blocks;

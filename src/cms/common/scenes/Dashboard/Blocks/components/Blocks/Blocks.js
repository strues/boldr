/* @flow */
import React from 'react';
import { Grid, Col, Row } from 'components/index';
import { Menu, Segment, Icon, Button } from 'semantic-ui-react';
import type { Block as BlockType } from 'types/models';
import { Block, CreateBlockForm } from '../';

type Props = {
  handleSubmit: () => void,
  blocks: Array<BlockType>
}
const Blocks = (props: Props) => {
  return (
    <Row>
      <Col xs={ 12 } md={ 8 }>
         <Segment>
         <Segment inverted>
           <Button icon>
             <Icon name="list layout" />
           </Button>
         </Segment>
           Blocks
           { !(props.blocks: Array<BlockType>) ?
             <div>Loading</div> :
             props.blocks.map(block => <Block key={ block.id } block={ block } />)
           }
         </Segment>
      </Col>
      <Col xs={ 12 } md={ 4 }>
        <CreateBlockForm onSubmit={ props.handleSubmit } />
      </Col>
      </Row>
  );
};

export default Blocks;

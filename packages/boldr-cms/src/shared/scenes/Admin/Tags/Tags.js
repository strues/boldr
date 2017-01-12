/* @flow */
import React from 'react';
import { List, ListItem } from 'material-ui/List';
import { Row, Col } from '../../../components';
import type { Tag } from '../../../types/models';

type Props = {
  tags: Array<Tag>
};

const Tags = (props: Props) => {
  return (
    <Row>
      <Col sm={ 12 } md={ 4 }>
        <List>
          {
            props.tags.map(tag =>
            <ListItem key={ tag.id } primaryText={ tag.name } secondaryText={ tag.description } />)
          }
        </List>
      </Col>
    </Row>
  );
};

export default Tags;

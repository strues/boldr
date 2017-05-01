/* @flow */
import React from 'react';
import { CardText, SelectionControlGroup, Row, Col } from 'boldr-ui';

type Props = {
  sorted: string,
  onSortChange: () => void,
};
const controls = [
  {
    label: 'Sort by post title',
    value: 'title',
  },
  {
    label: 'Sort by post creation date',
    value: 'createdAt',
  },
];

const TableControls = (props: Props) => (
  <CardText>
    <Row>
      <Col xs={12}>
        <SelectionControlGroup
          id="tablecontrols-sort-table-by"
          name="sort-posts-by"
          type="radio"
          label="Post Listing"
          value={props.sorted}
          onChange={props.onSortChange}
          controls={controls}
        />
      </Col>
    </Row>
  </CardText>
);

export default TableControls;

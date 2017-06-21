/* @flow */
import React from 'react';
import Row from './Row';
import Col from './Col';

const CenterBlock = ({ children }: ReactChildren) => {
  return (
    <Row xsCenter>
      <Col xs={6}>
        {children}
      </Col>
    </Row>
  );
};

export default CenterBlock;

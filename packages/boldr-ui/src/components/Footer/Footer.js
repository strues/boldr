/* @flow */
import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { Row, Col } from '../Layout';
import { StyleClasses } from '../../theme/styleClasses';

type Props = {
  className: string,
  single: boolean,
  colMain: ?any,
  col2: ?any,
  col3: ?any,
  children: ?any,
};

const FooterInner = styled.div`
  position: relative;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 40px 0;
  min-height: 150px;
  margin-left: auto;
  margin-right: auto;
  max-width: 71rem;
`;
const BASE_ELEMENT = StyleClasses.FOOTER;

const Footer = (props: Props) => {
  const classes = classnames(BASE_ELEMENT, props.className);

  const renderCol = (
    <Row>
      <Col xs={12} md={6}>
        {props.colMain}
      </Col>
      <Col xs={12} md={6}>
        <Row>
          <Col xs={12} md={3}>
            {props.col2}
          </Col>
          <Col xs={12} md={3}>
            {props.col3}
          </Col>
        </Row>
      </Col>
    </Row>
  );
  const renderSingle = (
    <Row>
      <Col xs>
        {props.children}
      </Col>
    </Row>
  );
  return (
    <footer className={classes}>
      <FooterInner>

        {props.single ? renderSingle : renderCol}

      </FooterInner>
    </footer>
  );
};

Footer.defaultProps = {
  single: false,
};

export default Footer;

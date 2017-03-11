/* @flow */
import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { Row, Col } from '../index';
import { StyleClasses } from '../../theme/theme';

type Props = {
  className: string,
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
  const classes = classnames(
    BASE_ELEMENT,
    props.className,
  );
  return (
    <footer className={ classes }>
      <FooterInner>
        <Row>
          <Col xs={ 12 } md={ 6 }>
            Crafted with ❤️ in Colorado by { ' ' }
            <a href="https://twitter.com/struesco" target="_blank" rel="noopener noreferrer">
              Steven Truesdell
            </a>
          </Col>
          <Col xs={ 12 } md={ 6 }>
            <Row>
              <Col xs={ 12 } md={ 3 }>
                Links
              </Col>
              <Col xs={ 12 } md={ 3 }>
                Links
              </Col>
            </Row>
          </Col>
      </Row>
      </FooterInner>
    </footer>
  );
};

export default Footer;

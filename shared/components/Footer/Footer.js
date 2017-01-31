import React from 'react';

import styled from 'styled-components';
import { Row, Col } from '../index';

const FooterContainer = styled.div`
  position: relative;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 40px 0;
  min-height: 150px;
  margin-left: auto;
  margin-right: auto;
  max-width: 71rem;
  background-color: #262B33;
`;

const Footer = (props) => {
  return (
    <footer className="boldr-footer">
      <FooterContainer>
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
      </FooterContainer>
    </footer>
  );
};

export default Footer;

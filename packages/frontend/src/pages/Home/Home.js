/* @flow */

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
// internal
import Headline from '@boldr/ui/Headline';
import Paragraph from '@boldr/ui/Paragraph';
import { Grid, Row, Col } from '@boldr/ui/Layout';

const HomeHero = styled.div`
  background-color: #243140;
  height: 450px;
  width: 100%;
`;

class Home extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Home" />
        <HomeHero>
          <Headline type="h1">Meet Boldr.</Headline>
        </HomeHero>
        <Grid>
          <Row>
            <Col xs={12} md={4}>
              <Headline type="h2">Placeholder 1</Headline>
              <Paragraph>
                This proposal introduces an Observable type to the ECMAScript standard library. The
                Observable type can be used to model push-based data sources such as DOM events,
                timer intervals, and sockets.
              </Paragraph>
            </Col>
            <Col xs={12} md={4}>
              <Headline type="h2">Placeholder 2</Headline>
              <Paragraph>
                The iterator interface (introduced in ECMAScript 2015) is a sequential data access
                protocol which enables the development of generic and composable data consumers and
                transformers. Their primary interface is a next() method which returns a value, done
                tuple, where done is a boolean indicating whether the end of the iterator has been
                reached, and value is the yielded value in the sequence.
              </Paragraph>
            </Col>
            <Col xs={12} md={4}>
              <Headline type="h2">Placeholder 3</Headline>
              <Paragraph>
                In ECMAScript, a realm consists of a global object and an associated set of
                primordial objects -- mutable objects like Array.prototype that must exist before
                any code runs. Objects within a realm implicitly share these primordials and can
                therefore easily disrupt each other by primordial poisoning -- modifying these
                objects to behave badly. This disruption may happen accidentally or maliciously.
                Today, in the browser, realms can be created via same origin iframes.
              </Paragraph>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;

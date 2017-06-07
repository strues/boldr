import React from 'react';
import styled from 'styled-components';
import { Headline, Paragraph } from 'boldr-ui';
import { Grid, Col, Row } from '~components/Layout';
import Button from '../../components/Button';

const ContentArea = styled.div`
  padding-top: 50px;
  width: 100%;
`;

const HomeHero = () => {
  return (
    <Grid fluid={false}>
      <Row>
        <Col xs={12}>
          <Row center="xs">
            <Col xs={8}>
              <Headline type="h1">Meet Boldr.</Headline>
              <Paragraph isLead>
                A modern content management framework.
              </Paragraph>
              <Button type="primary">Learn More</Button>
            </Col>
          </Row>
        </Col>
      </Row>

    </Grid>
  );
};

export default HomeHero;

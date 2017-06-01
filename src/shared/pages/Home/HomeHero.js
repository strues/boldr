import React from 'react';
import styled from 'styled-components';
import { Headline, Paragraph, Grid, Col, Row } from 'boldr-ui';
import Button from '../../components/Button';

const ContentArea = styled.div`
  padding-top: 50px;
  width: 100%;
`;

const HomeHero = () => {
  return (
    <div>
      <Grid>
        <Row xsCenter>
          <Col xs={6}>
            <Headline type="h1">Meet Boldr.</Headline>
            <Paragraph isLead>A modern content management framework.</Paragraph>
            <Button type="primary">Learn More</Button>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default HomeHero;

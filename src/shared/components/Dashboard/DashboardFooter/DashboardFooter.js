/* @flow */
import React from 'react';
import Link from 'react-router-dom/Link';
import classnames from 'classnames';
import { Grid, Col, Row } from '../../Layout';
import { StyleClasses } from '../../../theme/styleClasses';

const BASE_ELEMENT = StyleClasses.DASHBOARD_FOOTER;
type Props = {
  className: ?string,
  copyright: ?string,
};

const DashboardFooter = (props: Props) => {
  const classes = classnames(BASE_ELEMENT, props.className);
  return (
    <footer className={classes}>
      <Grid fluid>
        <Row>
          <Col xs={12} md={8}>
            <span className={`${BASE_ELEMENT}-copyright`}>
              {props.copyright}
            </span>
          </Col>
          <Col xs={12} md={4}>
            <span className={`${BASE_ELEMENT}-powered`}>
              Powered by <a href="https://boldr.io">Boldr</a>
            </span>
          </Col>
        </Row>
      </Grid>
    </footer>
  );
};

export default DashboardFooter;

/* @flow */
import React from 'react';
import Link from 'react-router-dom/Link';
import classnames from 'classnames';
import { Col, Row } from '@boldr/ui/Layout';
import { StyleClasses } from '../../../../../theme/styleClasses';

const BASE_ELEMENT = StyleClasses.DASHBOARD_FOOTER;
type Props = {
  className: ?string,
  copyright: ?string,
};

const DashboardFooter = (props: Props) => {
  const classes = classnames(BASE_ELEMENT, props.className);
  return (
    <footer className={classes}>
      <Row>
        <Col sm={8} md={9}>
          <span className={`${BASE_ELEMENT}-copyright`}>
            {props.copyright}
          </span>
        </Col>
        <Col sm={4} md={3}>
          <span className={`${BASE_ELEMENT}-powered`}>
            Powered by <a href="https://boldr.io">Boldr</a>
          </span>
        </Col>
      </Row>
    </footer>
  );
};

export default DashboardFooter;

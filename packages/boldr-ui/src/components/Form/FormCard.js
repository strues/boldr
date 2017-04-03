/* @flow */
import React from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';
import styled from 'styled-components';

import type { ReactElement } from '../../types/react.js.flow';
import { Grid, Col, Row } from '../Layout';

const FormFooter = styled.ul`
  list-style-type: none;
`;

const FormFooterItem = styled.li`
  line-height: 1.5em;
`;

type Props = {
  width: Number,
  title: String,
  form: ReactElement,
  extra1: any,
  extra2: ?any,
};

const FormCard = (props: Props) => {
  return (
    <div>
      <Row>
        <Col xs={12}>
          <Row xsCenter>
            <Col xs={6}>
              <Card
                style={{
                  maxWidth: props.width || 600,
                  marginTop: '100px',
                }}
                className="md-block-centered"
              >
                <CardTitle className="boldr-form__title" title={props.title} expander />
                <CardText>
                  {props.form}
                </CardText>
                <CardActions style={{ justifyContent: 'center' }} expandable>
                  <FormFooter>
                    <FormFooterItem>{props.extra1}</FormFooterItem>
                    <FormFooterItem>{props.extra2}</FormFooterItem>
                  </FormFooter>
                </CardActions>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default FormCard;

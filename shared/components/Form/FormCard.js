import React from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';

import { Grid, Col, Row } from '../Layout';

const FormCard = (props) => {
  return (
    <Row>
      <Col xs={ 12 }>
        <Row xsCenter>
          <Col xs={ 6 }>
            <Card style={ { maxWidth: 600 } } className="md-block-centered">
              <CardTitle
                title={ props.title }
                subtitle={ props.subtitle }
              />
              <CardText>
                { props.form }
              </CardText>
              <CardActions>
                { props.extra1 }
                { props.extra2 }
              </CardActions>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default FormCard;

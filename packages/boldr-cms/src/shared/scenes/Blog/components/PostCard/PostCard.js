/* @flow */
import React from 'react';
import { Link } from 'react-router';
import dateFns from 'date-fns';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { Col, Row } from '../../../../components/Layout';
import type { Post } from '../../../../types/models';
import TagBlock from '../TagBlock';

const PostCard = (props: Post) => {
  const formattedDate = dateFns.format(props.created_at, 'MM/DD/YYYY');
  return (
    <div className="post__card-wrapper">
      <Card>
        <CardMedia
          overlay={ <CardTitle title={ props.title } subtitle={ formattedDate } /> }
        >
          <img src={ props.feature_image } />
        </CardMedia>
        <CardText>
            { props.excerpt }
          <Row>
            <Col xs={ 12 }>
          <Link to={ `/blog/${props.slug}` } style={ { float: 'right', marginTop: '15px', marginRight: '15px' } }>
            <RaisedButton primary label="Read More" />
          </Link>
        </Col>
      </Row>
        </CardText>
        <Divider />
        <CardActions>
        <Row>

        <Col xs={ 12 }>
        <TagBlock tags={ props.tags } />
        </Col>
      </Row>
      </CardActions>

      </Card>
      </div>
  );
};

export default PostCard;

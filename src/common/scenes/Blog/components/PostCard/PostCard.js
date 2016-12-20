/* @flow */
import React from 'react';
import { Link } from 'react-router';
import dateFns from 'date-fns';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { Row, Divider } from 'components/index';
import type { Post } from 'types/models';
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
        <Divider />
        <CardActions>

        <Link to={ `/blog/${props.slug}` } style={ { marginRight: '15px' } }>
          <RaisedButton primary label="Read More" />
        </Link>

        <TagBlock tags={ props.tags } />

      </CardActions>
        </CardText>
      </Card>
      </div>
  );
};

export default PostCard;

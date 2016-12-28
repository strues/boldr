// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { format } from 'date-fns';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

type Props = {
  title: string,
  created_at: string,
  display_name?: string,
  feature_image?: string,
  excerpt?: string,
  tags?: Array<any>,
  content: Object,
  user?: Object,
  slug: string,
};

const TagListCard = (props: Props) => {
  const formattedDate = format(props.created_at, 'MM/DD/YYYY');
  return (
    <div>
      <Card>
            <CardMedia
              overlay={<CardTitle title={ props.title } subtitle={ formattedDate } />}
            >
              <img className="post__card-image" src={ props.feature_image }
                alt={ props.title } height="350px" width="100%"
              />
            </CardMedia>
          <img className="post__card-image" src={ props.feature_image }
            alt={ props.title } height="350px" width="100%"
          />
        <CardText>
        { props.excerpt }
      </CardText>
      <CardActions>
      <Link to={ `/blog/${props.slug}` }>
        <FlatButton label="Read More" />
      </Link>
    </CardActions>
      </Card>
      </div>
  );
};

export default TagListCard;

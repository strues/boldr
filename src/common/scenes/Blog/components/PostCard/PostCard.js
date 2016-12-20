/* @flow */
import React from 'react';
import { Link } from 'react-router';
import dateFns from 'date-fns';
import RaisedButton from 'material-ui/RaisedButton';
import { Row, Card, CardImage, CardFooter, CardContent, Divider } from 'components/index';
import type { Post } from 'types/models';
import TagBlock from '../TagBlock';

const PostCard = (props: Post) => {
  const formattedDate = dateFns.format(props.created_at, 'MM/DD/YYYY');
  return (
    <div className="post__card-wrapper">
      <Card fluid>
        <CardImage imgSrc={ props.feature_image } />
        <CardContent title={ props.title }>
            { props.excerpt }
        <Divider />
        <CardFooter>

        <Link to={ `/blog/${props.slug}` } style={ { marginRight: '15px' } }>
          <RaisedButton primary label="Read More" />
        </Link>

        <TagBlock tags={ props.tags } />

      </CardFooter>
        </CardContent>
      </Card>
      </div>
  );
};

export default PostCard;

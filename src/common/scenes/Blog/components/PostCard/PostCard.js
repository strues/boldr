/* @flow */
import React from 'react';
import { Link } from 'react-router';
import dateFns from 'date-fns';
// import { Card, Image } from 'semantic-ui-react';
import { Row, Button, Card, CardImage, CardFooter, CardContent } from 'components/index';
import type { Post } from 'types/models';
import TagBlock from '../TagBlock';

const PostCard = (props: Post) => {
  const formattedDate = dateFns.format(props.created_at, 'MM/DD/YYYY');
  return (
    <div className="post__card-wrapper">
      <Card fluid>
        <CardImage imgSrc={ props.feature_image } />
        <CardContent title={ props.title }>

            { formattedDate }

            { props.excerpt }

        <CardFooter>
        <Row>
        <Link to={ `/blog/${props.slug}` }>
          <Button>Read More</Button>
        </Link>
        </Row>
        <Row xsEnd>
        <TagBlock tags={ props.tags } />
        </Row>
      </CardFooter>
        </CardContent>
      </Card>
      </div>
  );
};

export default PostCard;

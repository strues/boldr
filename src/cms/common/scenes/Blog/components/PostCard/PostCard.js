/* @flow */
import React from 'react';
import { Link } from 'react-router';
import dateFns from 'date-fns';
import { Button, Card, Image } from 'semantic-ui-react';
import { Row } from 'components/index';
import type { Post } from 'state/dux/post';
import TagBlock from '../TagBlock';

const PostCard = (props: Post) => {
  const formattedDate = dateFns.format(props.created_at, 'MM/DD/YYYY');
  return (
    <div>
      <Card fluid>
        <Image className="post__card-image" src={ props.feature_image } />
        <Card.Content>
          <Card.Header>
            { props.title }
          </Card.Header>
          <Card.Meta>
            { formattedDate }
          </Card.Meta>
          <Card.Description>
            { props.excerpt }
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <Row>
        <Link to={ `/blog/${props.slug}` }>
          <Button>Read More</Button>
        </Link>
        <TagBlock tags={ props.tags } />
        </Row>
        </Card.Content>
      </Card>
      </div>
    );
};

export default PostCard;

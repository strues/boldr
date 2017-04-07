/* @flow */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import classnames from 'classnames';
import Button from 'react-md/lib/Buttons/Button';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';
import { Col, Row, StyleClasses, Media, MediaOverlay } from 'boldr-ui';
import { selectPost } from '../../../../state/modules/blog/posts/actions';

import TagBlock from '../TagBlock';

const BASE_ELEMENT = StyleClasses.POST_CARD;
type Props = {
  className: string,
  id: ?string,
  featureImage: ?string,
  title: string,
  slug: string,
  content: ?string,
  backgroundImage: ?string,
  excerpt: ?string,
  createdAt: string,
  updatedAt: ?string,
  status: ?string,
  author: string,
  seo: ?Object,
  tags: ?Array<Tag>,
  attachments: ?Object,
  meta: ?Object,
  userId: ?string,
  dispatch: Function,
  listTags: Object,
};

export const PostCard = (props: Props) => {
  const formattedDate = dateFns.format(props.createdAt, 'MM/DD/YYYY');
  const classes = classnames(BASE_ELEMENT, props.className);
  const postTags = props.tags ? props.tags.map(id => props.listTags[id]) : null;
  // Explicitly define post rather than passing additional
  // unnecessary props like listTags
  const post = {
    id: props.id,
    author: props.author,
    attachments: props.attachments,
    content: props.content,
    createdAt: props.createdAt,
    excerpt: props.excerpt,
    backgroundImage: props.backgroundImage,
    featureImage: props.featureImage,
    meta: props.meta,
    slug: props.slug,
    status: props.status,
    tags: props.tags,
    title: props.title,
    userId: props.userId,
  };
  function transitionPost() {
    props.dispatch(selectPost(post));
  }

  return (
    <div className={ classes }>
      <Card>
        <Media>
          <img src={ props.featureImage } alt={ `${props.title} feature` } role="presentation" />
          <MediaOverlay>
            <CardTitle title={ props.title } subtitle={ formattedDate }>
              <Button className="md-cell--right" icon>star_outline</Button>
            </CardTitle>
          </MediaOverlay>
        </Media>
        <CardText>
          {props.excerpt}
          <Row>
            <Col xs={ 12 }>
              <Link to={ `/blog/${props.slug}` } className="readmore-link">
                <Button raised primary label="Read More" onClick={ transitionPost } />
              </Link>
            </Col>
          </Row>
        </CardText>
        <CardActions>
          <TagBlock tags={ postTags } />
        </CardActions>
      </Card>
    </div>
  );
};

export default connect()(PostCard);

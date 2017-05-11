/* @flow */
import React from 'react';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import classnames from 'classnames';
import FlatButton from 'material-ui/FlatButton';
import { Col, Row, StyleClasses } from 'boldr-ui';
import {
  Card,
  CardActions,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card';
import { selectArticle } from '../../state/articles/actions';

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

export const ArticleCard = (props: Props) => {
  const formattedDate = dateFns.format(props.createdAt, 'MM/DD/YYYY');
  const classes = classnames(BASE_ELEMENT, props.className);
  const articleTags = props.tags
    ? props.tags.map(id => props.listTags[id])
    : null;
  // Explicitly define post rather than passing additional
  // unnecessary props like listTags
  const article = {
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
    props.dispatch(selectArticle(article));
  }

  return (
    <div className={classes}>
      <Card>
        <CardMedia
          overlay={<CardTitle title={props.title} subtitle={formattedDate} />}
        >
          <img src={props.featureImage} alt={`${props.title} feature image`} />
        </CardMedia>

        <CardText>
          {props.excerpt}
          <Row>
            <Col xs={12}>
              <Link to={`/blog/${props.slug}`} className="readmore-link">
                <FlatButton
                  primary
                  label="Read More"
                  onTouchTap={transitionPost}
                />
              </Link>
            </Col>
          </Row>
        </CardText>
        <CardActions>
          <TagBlock tags={articleTags} />
        </CardActions>
      </Card>
    </div>
  );
};

export default connect(state => state, null, null, { pure: true })(ArticleCard);

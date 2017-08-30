/* @flow */
import React from 'react';
import { format } from 'date-fns';
import Link from 'react-router-dom/Link';
import classnames from 'classnames';
import { Button, Card, CardTitle, CardText, CardActions, Media, StyleClasses } from '@boldr/ui';
import type { Article } from '../../../../types/boldr';

import TagBlock from '../TagBlock';

const BASE_ELEMENT = StyleClasses.ARTICLE_CARD;

type Props = {
  className?: string,
  article: Article,
};

const ArticleCard = (props: Props) => {
  const formattedDate = format(props.article.createdAt, 'MM/DD/YYYY');
  const classes = classnames(BASE_ELEMENT, props.className);
  const { title, image, slug, tags, excerpt } = props.article;
  return (
    <div className={classes}>
      <Card style={{ maxWidth: 600 }} className="md-block-centered">
        <Media>
          <img src={image} alt={`${title} feature image`} role="presentation" />
        </Media>
        <CardTitle title={title} subtitle={formattedDate} />
        <CardActions expander>
          <Link to={`/blog/${slug}`}>
            <Button kind="primary" outline>
              Read More
            </Button>
          </Link>
        </CardActions>
        <CardText expandable>{excerpt}</CardText>
        <TagBlock tags={tags} />
      </Card>
    </div>
  );
};

export default ArticleCard;

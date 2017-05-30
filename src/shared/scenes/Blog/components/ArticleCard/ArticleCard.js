/* @flow */
import React from 'react';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import classnames from 'classnames';
import FlatButton from 'material-ui/FlatButton';
import { StyleClasses } from 'boldr-ui';
import Col from '~components/Layout/Col';
import Row from '~components/Layout/Row';
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
  article: Article,
  dispatch: () => void,
};

export const ArticleCard = (props: Props) => {
  const formattedDate = dateFns.format(props.article.createdAt, 'MM/DD/YYYY');
  const classes = classnames(BASE_ELEMENT, props.className);

  function transitionPost() {
    const { article } = props;
    props.dispatch(selectArticle(article));
  }
  const { title, featureImage, slug, tags, excerpt } = props.article;
  return (
    <div className={classes}>
      <Card>
        <CardMedia
          overlay={<CardTitle title={title} subtitle={formattedDate} />}
        >
          <img src={featureImage} alt={`${title} feature image`} />
        </CardMedia>

        <CardText>
          {excerpt}
          <Row>
            <Col sm={12}>
              <Link to={`/blog/${slug}`} className="readmore-link">
                <FlatButton
                  primary
                  label="Read More"
                  onClick={transitionPost}
                />
              </Link>
            </Col>
          </Row>
        </CardText>
        <CardActions>
          <TagBlock tags={tags} />
        </CardActions>
      </Card>
    </div>
  );
};

export default connect(state => state, null, null, { pure: true })(ArticleCard);

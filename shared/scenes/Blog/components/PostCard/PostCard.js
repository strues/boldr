/* @flow */
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import Button from 'react-md/lib/Buttons/Button';
import Divider from 'react-md/lib/Dividers';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';
import Media, { MediaOverlay } from 'react-md/lib/Media';
import { selectPost } from '../../../../state/modules/blog/posts/actions';
import { Col, Row } from '../../../../components/Layout';
import type { Tag } from '../../../../types/models';
import TagBlock from '../TagBlock';

type Props = {
  id?: String,
  feature_image?: String,
  title?: String,
  slug: String,
  content?: String,
  background_image?: String,
  excerpt?: String,
  created_at: String,
  updated_at?: String,
  status: ?String,
  author: String,
  seo?: Object,
  tags?: Array<Tag>,
  attachments: ?Object,
  meta: ?Object,
  user_id: ?String,
  dispatch: Function,
  listTags: Object,
}

export const PostCard = (props: Props) => {
  const formattedDate = dateFns.format(props.created_at, 'MM/DD/YYYY');

  const postTags = props.tags ? props.tags.map(id => props.listTags[id]) : null;
  // Explicitly define post rather than passing additional
  // unnecessary props like listTags
  const post = {
    id: props.id,
    author: props.author,
    attachments: props.attachments,
    content: props.content,
    created_at: props.created_at,
    excerpt: props.excerpt,
    feature_image: props.feature_image,
    meta: props.meta,
    slug: props.slug,
    status: props.status,
    tags: props.tags,
    title: props.title,
    user_id: props.user_id,
  };
  function transitionPost() {
    props.dispatch(selectPost(post));
  }

  return (
    <div className="boldr-post__card-wrapper">
      <Card>
        <Media>
          <img src={ props.feature_image } role="presentation" />
          <MediaOverlay>
           <CardTitle title={ props.title } subtitle={ formattedDate }>
             <Button className="md-cell--right" icon>star_outline</Button>
           </CardTitle>
         </MediaOverlay>
        </Media>
        <CardText>
          { props.excerpt }
          <Row>
            <Col xs={ 12 }>
              { /* $FlowIssue */}
              <Link to={ `/blog/${props.slug}` } style={ { float: 'right', marginTop: '15px', marginRight: '15px' } }>
                <Button raised primary label="Read More" onClick={ transitionPost } />
              </Link>
            </Col>
          </Row>
        </CardText>
        <Divider />
        <CardActions>
          <Row>
            <Col xs={ 12 }>
              <TagBlock tags={ postTags } />
            </Col>
          </Row>
        </CardActions>
      </Card>
    </div>
  );
};

export default connect()(PostCard);

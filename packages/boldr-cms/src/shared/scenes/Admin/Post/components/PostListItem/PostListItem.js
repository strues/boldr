/* @flow */
import React from 'react';
import Link from 'react-router/lib/Link';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

import { selectPost } from '../../../../../state/modules/blog/posts/actions';

type Props = {
  id: String,
  feature_image: String,
  title: String,
  handleArticlePublishClick: Function,
  handleDeleteClick: Function,
  handleArticleDraftClick: Function,
  created_at: String,
  status: String,
  excerpt: String,
  slug: String,
};

const PostListItem = (props: Props) => {
  function handlePublishClick() {
    const postId:String = props.id;
    const postStatus = 'draft';
    props.handleArticlePublishClick(postId, postStatus);
  }
  function handleDraftClick() {
    const postId = props.id;
    const postStatus = 'published';
    props.handleArticleDraftClick(postId, postStatus);
  }
  const post = props;
  function transitionPost() {
    props.dispatch(selectPost(post))
  }
  function handleClickDelete() {
    const postId: String = props.id;
    props.handleDeleteClick(postId);
  }
  const formattedDate = format(props.created_at, 'MM/DD/YYYY');

  return (
    <div className="post-list__item">
      <ListItem
        leftAvatar={ <Avatar src={ props.feature_image } /> }
        primaryText={
          <Link to={ `/admin/posts/editor/${props.slug}` } onClick={ transitionPost }>
          { props.title }
          </Link>
        }
      />
    <Divider />
    </div>
  );
};

export default connect()(PostListItem);

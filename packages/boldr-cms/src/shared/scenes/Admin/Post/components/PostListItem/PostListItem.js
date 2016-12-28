/* @flow */
import React from 'react';
import Link from 'react-router/lib/Link';
import { format } from 'date-fns';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

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
          <Link to={ `/admin/posts/editor/${props.slug}` }>
          { props.title }
          </Link>
        }
      />
    <Divider />
    </div>
  );
};

export default PostListItem;

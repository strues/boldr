/* @flow */
import React from 'react';
import Link from 'react-router/lib/Link';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import { grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import { selectPost } from '../../../../../state/modules/blog/posts/actions';

type Props = {
  id: String,
  feature_image: String,
  title: String,
  handleArticlePublishClick: Function,
  handleDeleteClick: Function,
  handleArticleDraftClick: Function,
  dispatch: Function,
  created_at: String,
  status: String,
  excerpt: String,
  slug: String,
};

const PostListItem = (props: Props) => {
  const iconButtonElement = (
    <IconButton
      touch
      tooltip="more"
      tooltipPosition="bottom-left"
    >
      <MoreVertIcon color={ grey400 } />
    </IconButton>
  );
  const rightIconMenu = (
    <IconMenu iconButtonElement={ iconButtonElement }>
      <MenuItem>Edit</MenuItem>
      <MenuItem onClick={ handleClickDelete }>Delete</MenuItem>
    </IconMenu>
  );
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
    props.dispatch(selectPost(post));
  }
  function handleClickDelete() {
    const postId: String = props.id;
    props.handleDeleteClick(postId);
  }
  const formattedDate = format(props.created_at, 'MM/DD/YYYY');

  return (
    <div className="bldr__postlist-item">
      <ListItem
        rightIconButton={ rightIconMenu }
        leftAvatar={ <Avatar src={ props.feature_image } /> }
        primaryText={
          // $FlowIssue
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

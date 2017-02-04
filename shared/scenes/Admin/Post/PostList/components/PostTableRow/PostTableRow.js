/* @flow */
import React from 'react';
import Link from 'react-router/lib/Link';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import Button from 'react-md/lib/Buttons';
import FontIcon from 'react-md/lib/FontIcons';
import Avatar from 'react-md/lib/Avatars';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import type { Post } from '../../../../../../types/models';
import { selectPost } from '../../../../../../state/modules/blog/posts/actions';

type Props = {
  id: String,
  feature_image: String,
  postId: String,
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

const PostTableRow = (props: Props) => {
  const post = props;

  function handlePublishClick() {
    const postId = props.id;
    const postStatus = 'draft';
    props.handleArticlePublishClick(postId, postStatus);
  }

  function handleDraftClick() {
    const postId = props.id;
    const postStatus = 'published';
    props.handleArticleDraftClick(postId, postStatus);
  }

  function handleClickDelete(post) {
    const postId = post.id;

    props.handleDeleteClick(postId);
  }

  const formattedDate = format(props.created_at, 'MM/DD/YYYY');
  return (
    <TableRow key={ post.id }>
      <TableColumn style={ { width: '5%' } }>
        <Avatar src={ post.feature_image } role="presentation" />
      </TableColumn>
      <TableColumn>
        { /* $FlowIssue */ }
        <Link to={ `/admin/posts/editor/${post.slug}` }>
          { post.title }
        </Link>
      </TableColumn>
      <TableColumn>{ post.published === true ? 'published' : 'draft' }</TableColumn>
      <TableColumn>{format(post.created_at, 'MM/DD/YYYY')}</TableColumn>
       <TableColumn>
         { /* $FlowIssue */ }
         <Link to={ `/admin/posts/editor/${post.slug}` }>
          <Button icon>mode_edit</Button>
        </Link>
        <Button onClick={ () => handleClickDelete(post) } icon>delete_forever</Button>
      </TableColumn>
    </TableRow>
  );
};
export default connect()(PostTableRow);

/* @flow */
import React from 'react';
import Link from 'react-router/lib/Link';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import Button from 'react-md/lib/Buttons';
import FontIcon from 'react-md/lib/FontIcons';
import ListItem from 'react-md/lib/Lists/ListItem';
import Avatar from 'react-md/lib/Avatars';
import Divider from 'react-md/lib/Dividers';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import SelectFieldColumn from 'react-md/lib/DataTables/SelectFieldColumn';
import type { Post } from '../../../../../types/models';
import { selectPost } from '../../../../../state/modules/blog/posts/actions';

type Props = {
  posts: Array<Post>,
  id: String,
  feature_image: String,
  title: String,
  onRowToggle: Function,
  handleArticlePublishClick: Function,
  handleDeleteClick: Function,
  handleArticleDraftClick: Function,
  dispatch: Function,
  created_at: String,
  status: String,
  excerpt: String,
  slug: String,
};

const PostTable = (props: Props) => {
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

  const rows = props.posts.map(post => (
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
      </TableRow>
    ));
  return (
     <DataTable baseId="PostListing" onRowToggle={ transitionPost }>
       <TableHeader>
         <TableRow>
           <TableColumn>Feature Image</TableColumn>
           <TableColumn>Title</TableColumn>
           <TableColumn>Status</TableColumn>
           <TableColumn>Created</TableColumn>
         </TableRow>
       </TableHeader>
       <TableBody>
         {rows}
       </TableBody>
     </DataTable>
  );
};

export default connect()(PostTable);

/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

import type { Post } from '../../../../../../types/models';
import { selectPost } from '../../../../../../state/modules/blog/posts/actions';
import PostTableRow from '../PostTableRow';

type Props = {
  posts: Array<Post>,
  id: String,
  onRowToggle: Function,
  dispatch: Function,
};

const PostTable = (props: Props) => {
  const post = props;
  function transitionPost() {
    props.dispatch(selectPost(post));
  }

  return (
     <DataTable baseId="PostListing" onRowToggle={ transitionPost }>
       <TableHeader>
         <TableRow>
           <TableColumn>Feature Image</TableColumn>
           <TableColumn>Title</TableColumn>
           <TableColumn>Status</TableColumn>
           <TableColumn>Created</TableColumn>
          <TableColumn>Actions</TableColumn>
         </TableRow>
       </TableHeader>
       <TableBody>
         {
           props.posts.map(post => <PostTableRow key={ post.id } { ...post } />)
          }
       </TableBody>
     </DataTable>
  );
};

export default connect()(PostTable);

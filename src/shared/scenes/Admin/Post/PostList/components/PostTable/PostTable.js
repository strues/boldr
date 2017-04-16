/* @flow */
/* eslint-disable react/prop-types, react/jsx-no-bind */
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import Link from 'react-router-dom/Link';
import {format} from 'date-fns';
import {
  Button,
  FontIcon,
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  TablePagination,
  Avatar,
} from 'boldr-ui';

import config from '../../../../../../../../config';
import {selectPost} from '../../../../../../state/modules/blog/posts/actions';

type Props = {
  posts: Array<Post>,
  id: String,
  onRowToggle: Function,
  dispatch: Function,
  data: any,
};

class PostTable extends PureComponent {
  render() {
    const rows = this.props.posts.map(p => (
      <TableRow key={p.id}>
        <TableColumn style={{maxWidth: '125px'}}>
          <Avatar
            src={`${config('apiUrl')}${p.featureImage}`}
            role="presentation"
          />
        </TableColumn>
        <TableColumn>
          <Link to={`/admin/post-editor/${p.slug}`}>{p.title}</Link>
        </TableColumn>
        <TableColumn>
          {p.published ? <span>Published</span> : <span>Draft</span>}
        </TableColumn>
        <TableColumn>{format(p.createdAt, 'MMMM Do YYYY')}</TableColumn>
        <TableColumn>
          <Button onClick={() => this.props.handleDeleteClick(p.id)} icon>
            delete_forever
          </Button>
        </TableColumn>
      </TableRow>
    ));
    return (
      <DataTable baseId="posts">
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
          {rows}
        </TableBody>
      </DataTable>
    );
  }
}
export default connect()(PostTable);

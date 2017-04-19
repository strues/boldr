/* @flow */
/* eslint-disable react/prop-types, react/jsx-no-bind */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import cn from 'classnames';
import { format } from 'date-fns';
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

import { selectPost } from '../../../../../../state/modules/blog/posts/actions';

type Props = {
  posts: Array<Post>,
  id: String,
  onRowToggle: Function,
  dispatch: Function,
  data: any,
};

class PostTableRow extends PureComponent {
  render() {
    const {
      featureImage,
      slug,
      id,
      title,
      published,
      createdAt,
      handleDeleteClick,
      className,
      ...props
    } = this.props;

    return (
      <TableRow key={title} {...props}>
        <TableColumn style={{ maxWidth: '125px' }}>
          <Avatar src={featureImage} role="presentation" />
        </TableColumn>
        <TableColumn>
          <Link to={`/admin/post-editor/${slug}`}>{title}</Link>
        </TableColumn>
        <TableColumn>
          {published ? <span>Published</span> : <span>Draft</span>}
        </TableColumn>
        <TableColumn numeric>{format(createdAt, 'MMMM Do YYYY')}</TableColumn>
        <TableColumn>
          <Button onClick={() => handleDeleteClick(id)} icon>
            delete_forever
          </Button>
        </TableColumn>
      </TableRow>
    );
  }
}
export default PostTableRow;

/* @flow */
/* eslint-disable react/prop-types, react/jsx-no-bind */
import React, { PureComponent } from 'react';
import Link from 'react-router-dom/Link';
import { format } from 'date-fns';
import { Button, TableRow, TableColumn, Avatar } from 'boldr-ui';

type Props = {
  featureImage: string,
  id: string,
  slug: string,
  published: boolean,
  createdAt: Date,
  title: string,
  handleDeleteClick: Function,
};

class PostTableRow extends PureComponent {
  deletePost = () => {
    const { id } = this.props;
    this.props.handleDeleteClick(id);
  };
  props: Props;
  render() {
    const {
      featureImage,
      slug,
      title,
      published,
      createdAt,
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
          <Button onClick={this.deletePost} icon>
            delete_forever
          </Button>
        </TableColumn>
      </TableRow>
    );
  }
}
export default PostTableRow;

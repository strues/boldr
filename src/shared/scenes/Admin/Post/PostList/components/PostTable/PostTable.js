/* @flow */
/* eslint-disable react/prop-types, react/jsx-no-bind */
import React, { Component } from 'react';
import sort from 'boldr-utils/es/logic/sort';
import { DataTable } from 'boldr-ui';

import PostTableHeader from './PostTableHeader';
import PostTableBody from './PostTableBody';
import TableControls from './TableControls';

type Props = {
  posts: Array<Post>,
  id: String,
  handleDeleteClick: Function,
  dispatch: Function,
  data: any,
};
type State = {
  posts: Array<Post>,
  sortedPosts: Array<Post>,
  createdAtSorted: boolean,
  titleSorted: boolean,
  sortedType: string,
};

class PostTable extends Component {
  state = {
    sortedType: 'createdAt',
    titleSorted: null,
    createdAtSorted: true,
    sortedPosts: [],
  };
  state: State;
  componentWillMount() {
    this.setState({
      sortedPosts: sort(this.props.posts, 'createdAt', true),
    });
  }
  sort = () => {
    const key = this.state.sortedType;
    const sorted = !this.state[`${key}Sorted`];

    this.setState({
      sortedPosts: sort(this.props.posts, key, sorted),
      [`${key}Sorted`]: sorted,
    });
  };

  changeSortType = (value: string) => {
    const key = value === 'createdAt' ? 'title' : 'createdAt';
    this.setState({
      [`${key}Sorted`]: null,
      [`${value}Sorted`]: true,
      sortedType: value,
      sortedPosts: sort(this.props.posts, value, true),
    });
  };

  props: Props;
  render() {
    const {
      sortedPosts,
      createdAtSorted,
      titleSorted,
      sortedType,
    } = this.state;

    return (
      <div>
        <TableControls sorted={sortedType} onSortChange={this.changeSortType} />
        <DataTable baseId="posts" className="post-list-table">
          <PostTableHeader
            createdAtSorted={createdAtSorted}
            titleSorted={titleSorted}
            sort={this.sort}
          />
          <PostTableBody
            posts={sortedPosts}
            handleDeleteClick={this.props.handleDeleteClick}
          />
        </DataTable>
      </div>
    );
  }
}
export default PostTable;

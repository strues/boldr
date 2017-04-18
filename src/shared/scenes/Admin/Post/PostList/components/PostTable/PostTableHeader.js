/* @flow */
/* eslint-disable react/prop-types, react/jsx-no-bind */
import React from 'react';
import {TableHeader, TableRow, TableColumn} from 'boldr-ui';
import uuid from 'uuid';

type Props = {
  createdAtSorted: boolean,
  titleSorted: boolean,
  sort: () => void,
};
const PostTableHeader = (props: Props) => {
  const {titleSorted, createdAtSorted, sort} = props;
  return (
    <TableHeader>
      <TableRow>
        <TableColumn key={uuid.v4()}>Feature Image</TableColumn>
        <TableColumn
          key={uuid.v4()}
          adjusted={false}
          sorted={titleSorted}
          onClick={typeof titleSorted === 'boolean' ? sort : null}
        >
          Title
        </TableColumn>
        <TableColumn key={uuid.v4()} adjusted={false}>Status</TableColumn>
        <TableColumn
          key={uuid.v4()}
          adjusted={false}
          numeric
          sorted={createdAtSorted}
          onClick={typeof createdAtSorted === 'boolean' ? sort : null}
        >
          Created
        </TableColumn>
        <TableColumn key={uuid.v4()} adjusted={false}>Actions</TableColumn>
      </TableRow>
    </TableHeader>
  );
};
export default PostTableHeader;

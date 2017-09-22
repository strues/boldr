/* @flow */
import React from 'react';
import { Heading } from '@boldr/ui';
import styled from 'styled-components';

const ListHeader = styled.div`
  padding-left: 20px;
  padding-bottom: 1em;
`;
const ArticleListHead = () => {
  return (
    <ListHeader>
      <Heading type="h4">All Articles</Heading>
    </ListHeader>
  );
};

export default ArticleListHead;

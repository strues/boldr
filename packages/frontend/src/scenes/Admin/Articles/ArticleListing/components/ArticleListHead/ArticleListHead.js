/* @flow */
import React from 'react';
import Headline from '@boldr/ui/Headline';
import styled from 'styled-components';

const ListHeader = styled.div`
  padding-left: 20px;
  padding-bottom: 1em;
`;
const ArticleListHead = () => {
  return (
    <ListHeader>
      <Headline type="h4">All Articles</Headline>
    </ListHeader>
  );
};

export default ArticleListHead;

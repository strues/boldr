/* @flow */
import React from 'react';
import { Headline } from '@boldr/ui';
import styled from 'styled-components';

const TitleWrapper = styled.div`
  text-transform: uppercase;
  padding-top: 150px;
  text-align: center;
  margin: 0 auto;
`;
const ArticleTitle = (props: { title: string }) => {
  return (
    <TitleWrapper>
      <Headline type="h1" className="boldrui-post__title" lightText>{props.title}</Headline>
    </TitleWrapper>
  );
};

export default ArticleTitle;

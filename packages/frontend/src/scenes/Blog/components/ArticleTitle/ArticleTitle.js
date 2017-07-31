/* @flow */
import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import Headline from '@boldr/ui/Headline';
import { StyleClasses } from '../../../../theme/styleClasses';

const TitleWrapper = styled.div`
  text-transform: uppercase;
  padding-top: 150px;
  text-align: center;
  margin: 0 auto;
`;

const BASE_ELEMENT = StyleClasses.ARTICLE_TITLE;

const ArticleTitle = (props: { title: string }) => {
  const classes = cx(BASE_ELEMENT);
  return (
    <TitleWrapper>
      <Headline type="h1" className={classes} lightText>
        {props.title}
      </Headline>
    </TitleWrapper>
  );
};

export default ArticleTitle;

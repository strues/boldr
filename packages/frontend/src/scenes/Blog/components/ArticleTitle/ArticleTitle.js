/* @flow */
import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import Heading from '@boldr/ui/Heading';
import { StyleClasses } from '@boldr/ui/theme/styleClasses';

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
      <Heading type="h1" className={classes} text={props.title} isLight />
    </TitleWrapper>
  );
};

export default ArticleTitle;

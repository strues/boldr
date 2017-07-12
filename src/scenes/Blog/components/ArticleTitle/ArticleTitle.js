/* @flow */
import React from 'react';
import { Headline } from '@boldr/ui';
import styled from 'styled-components';
import cx from 'classnames';
import { StyleClasses } from '../../../../theme/styleClasses';

const TitleWrapper = styled.div`
  text-transform: uppercase;
  padding-top: 150px;
  text-align: center;
  margin: 0 auto;
`;

const BASE_ELEMENT = StyleClasses.ARTICLE_TITLE;

const ArticleTitle = (props: { title: string, className?: string }) => {
  const classes = cx(BASE_ELEMENT, props.className);
  return (
    <TitleWrapper>
      <Headline type="h1" className={classes} lightText>
        {props.title}
      </Headline>
    </TitleWrapper>
  );
};

export default ArticleTitle;

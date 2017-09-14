/* @flow */
import React from 'react';
import styled from 'styled-components';
import type { Node } from 'react';

type Props = {
  bgImg: ?string,
  children: Node,
  bgColor: ?string,
  bgHeight: ?number,
};

const HeroArticle = (props: Props) => {
  const BoldrHero = styled.div`
    background-color: ${props.bgColor};
    background-image: url(${props.bgImg});
    height: ${props.bgHeight}px;
    position: relative;
    background-size: cover;
    margin-bottom: 20px;
    background-position-x: 50%;
    background-position-y: 50%;
  `;
  return (
    <div className="boldr-hero">
      <BoldrHero>{props.children}</BoldrHero>
    </div>
  );
};

HeroArticle.defaultProps = {
  bgHeight: 450,
};

export default HeroArticle;

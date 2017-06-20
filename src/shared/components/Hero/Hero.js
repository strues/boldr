/* @flow */
import React from 'react';
import styled from 'styled-components';
import { Grid, Col } from '../Layout';

type Props = {
  bgImg: ?string,
  children: ReactChildren,
  bgColor: ?string,
  bgHeight: ?number,
};

const Hero = (props: Props) => {
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
    <div className="boldrui-hero">
      <BoldrHero>
        {props.children}
      </BoldrHero>
    </div>
  );
};

Hero.defaultProps = {
  bgHeight: 450,
};

export default Hero;

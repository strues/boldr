/* @flow */
import React from 'react';
import styled from 'styled-components';
import type { ReactChildren } from '../../types/react';
import Heading from '../Heading';
import { Grid, Col } from '../Layout';

type Props = {
  bgImage: ?String,
  headline: ?String,
  children: ?ReactChildren,
  bgColor: ?String,
};

const Hero = (props: Props) => {
  const BoldrHero = styled.div`
    background-color: ${props.bgColor};
    background-image: url(${props.bgImage});
    padding-top: 125px;
    height: 450px;
    position: relative;
    text-align: right;
    border-bottom: 1px solid #444;
    background-size: cover;
  `;
  return (
    <div className="boldr-hero">
      <BoldrHero>
        {props.children}
      </BoldrHero>
    </div>
  );
};

export default Hero;

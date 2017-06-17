/* @flow */
import R from 'ramda';
import React from 'react';
import styled from 'styled-components';
import { font, palette } from 'styled-theme';
import Dimmer from '../Dimmer';
import { theme } from '../../theme';

type Props = {
  overlay?: string | React$Element<*>,
  src: string,
  alt: string,
  cta?: React$Element<*>,
};

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  overflow: hidden;
  background-color: transparent;
  border-radius: ${theme.borders.radius};
`;

const Image = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
`;

const CallToAction = styled.div`
  margin-top: 1rem;
`;

const renderCTA = R.ifElse(
  R.has('cta'),
  props => <CallToAction>{props.cta}</CallToAction>,
  R.always(null),
);

const Photo = (props: Props) => (
  <Wrapper>
    <Image src={props.src} alt={props.alt} />
    <Dimmer>{props.overlay}{renderCTA(props)}</Dimmer>
  </Wrapper>
);

export default Photo;

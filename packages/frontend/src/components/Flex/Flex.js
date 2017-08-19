// @flow
import React from 'react';
import styled from 'styled-components';

type GlobalCssValues = 'initial' | 'inherit' | 'unset';

type WrapValue = 'nowrap' | 'wrap' | 'wrap-reverse' | GlobalCssValues;

type JustifyValue =
  | 'center'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'left'
  | 'right'
  | 'baseline'
  | 'first baseline'
  | 'last baseline'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch'
  | 'safe center'
  | 'unsafe center'
  | GlobalCssValues;

type AlignValue =
  | 'normal'
  | 'stretch'
  | 'center'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'self-start'
  | 'self-end'
  | 'left'
  | 'right'
  | 'first baseline'
  | 'last baseline'
  | 'safe center'
  | 'unsafe center'
  | GlobalCssValues;

export type Props = {
  auto?: boolean,
  column?: boolean,
  reverse?: boolean,
  justify?: JustifyValue,
  align?: AlignValue,
  wrap?: WrapValue,
  className?: string,
};

const FlexBox = styled.div`
  display: flex;
  ${({ auto }) => (auto ? 'flex: 1 1 auto;' : '')} ${({ justify }) =>
      justify ? `justify-content: ${justify};` : ''} ${({ align }) =>
      align ? `align-items: ${align};` : ''} ${({ wrap }) =>
      wrap ? `flex-wrap: ${wrap};` : ''} flex-direction: ${({ column, reverse }) => {
      const postFix = reverse ? '-reverse' : '';
      return column ? `column${postFix}` : `row${postFix}`;
    }};
`;

export default (props: Props) => <FlexBox {...props} />;

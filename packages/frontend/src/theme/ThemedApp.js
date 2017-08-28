// @flow
import * as React from 'react';
import styled from 'styled-components';

export type Props = {
  className?: string,
  children: Array<React.Node>,
};

const ThemedApp = ({ className, children }: Props) =>
  <div className={className}>
    {children}
  </div>;

export default styled(ThemedApp)`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`;

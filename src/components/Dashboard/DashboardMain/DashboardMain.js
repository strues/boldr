/* @flow */
import React from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactChildren,
};

const Dash = styled.section`
  width: 100%;
  flex: 1;
  height: 100%
`;

const DashboardMain = (props: Props) => {
  return (
    <Dash {...props}>
      {props.children}
    </Dash>
  );
};

export default DashboardMain;

import React from 'react';
import styled from 'styled-components';
import type { ReactChildren } from '../../../types/react.js.flow';

type Props = {
  children: ReactChildren,
};
const ContentCont = styled.div`
width: 100%;
height: 100%;
min-height: 100%;
box-sizing: border-box;
padding-left: 1rem;
padding-right: 1rem;
position: relative;
margin: 0 auto;
`;

const DashboardContent = (props: Props) => {
  return (
    <ContentCont {...props}>
      {props.children}
    </ContentCont>
  );
};

export default DashboardContent;

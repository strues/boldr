/* @flow */
import React from 'react';
import styled from 'styled-components';
import type { ReactElement } from '../../types/react';

const FormControlWrap = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;
`;

type Props = {
  children: ReactElement,
};

const FormGroup = (props: Props) => {
  return (
    <FormControlWrap>
      { props.children }
    </FormControlWrap>
  );
};

export default FormGroup;

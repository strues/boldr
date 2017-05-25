/* @flow */
import React from 'react';
import styled from 'styled-components';
import type { ReactElement } from '../../../types/react.js.flow';

type Props = {
  children: ReactElement,
  paddingTop: string,
  paddingBottom: string,
};

const FormGroup = (props: Props) => {
  const FormControlWrap = styled.div`
    padding-top: ${props.paddingTop};
    padding-bottom: ${props.paddingBottom};
  `;
  return (
    <FormControlWrap>
      {props.children}
    </FormControlWrap>
  );
};

FormGroup.defaultProps = {
  paddingTop: '15px',
  paddingBottom: '15px',
};

export default FormGroup;

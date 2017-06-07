import React from 'react';
import styled from 'styled-components';
import Label from './Label';
import Feedback from './Feedback';

/**
 * A wrapper around form input fields that will act as
 * a utility to enable streamlined labeling, styling,
 * and error handling
 */
export const InputWrapper = props => {
  return (
    <InputWrapperContainer ui={props.ui}>
      {props.label && <Label {...props} />}
      {props.children}
      <Feedback {...props} />
    </InputWrapperContainer>
  );
};

export default InputWrapper;

/**
 * When adding a ui prop to the redux form Field it allows us
 * to override the custom theme per form. Make sure you pass
 * ui an object
 */
const InputWrapperContainer = styled.div`
  margin-bottom: 1rem;
`;

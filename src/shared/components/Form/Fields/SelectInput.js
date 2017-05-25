// @flow

import React from 'react';
import styled from 'styled-components';
import InputWrapper from '../InputWrapper';
/**
 * An internal error handler to make sure we always pass
 * the Select component Field an array of options
 */
const handlePropsError = options => {
  if (!options && !Array.isArray(options)) {
    throw new Error(
      'Select component requires an array of options passed as an options prop',
    );
  }
};

type Props = {
  meta: Object,
  input: Object,
  options: Array<any>,
};

const SelectInput = (props: Props) => {
  const { meta } = props;
  const showError = meta.touched && meta.error && meta.invalid;

  handlePropsError(props.options);

  return (
    <InputWrapper {...props}>
      <SelectContainer>
        <SelectInputArea
          {...props.input}
          id={props.input.key}
          name={props.input.key}
          showError={showError}
          visited={meta.visited}
        >
          {props.options.map(option => (
            <OptionInput disabled={option.disabled} key={option.value}>
              {option.key}
            </OptionInput>
          ))}
        </SelectInputArea>
        <SelectArrow />
      </SelectContainer>
    </InputWrapper>
  );
};

const SelectContainer = styled.div`
  position: relative;
  svg {
    position: absolute;
    top: 5px;
    right: 16px;
  }
`;

const SelectInputArea = styled.select`
  background: #fff;
  border-radius: 3px;
  border: solid 1px #babbbb;
  border-color: ${props => (props.showError ? '#f44336' : '')};
  padding: 0.8rem;
  font-size: 16px;
  width: 100%;
  margin: 0 auto .5rem;
  max-width: auto;
  color: #484848;

  &:active,
  &:focus {
    border-color: ${props => (props.showError ? '#f44336' : '#babbbb')};
    outline: none;
  }
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;
  option[value=""][disabled] {
    display: none;
  }
`;

const OptionInput = styled.option`
  &:first-child {
    color: red;
  }
`;

const SelectArrow = () => (
  <svg
    fill="#676767"
    width="36"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7 10l5 5 5-5z" /><path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

export default SelectInput;

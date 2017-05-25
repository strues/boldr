import React from 'react';
import styled from 'styled-components';
import InputWrapper from '../InputWrapper';

const RadioField = props => {
  const { meta, ...rest } = props;
  const showError = meta.touched && meta.error && meta.invalid;

  return (
    <InputWrapper {...rest}>
      <RadioContainer>
        {props.options.map(option => (
          <RadioInputContainer key={option.value}>
            <RadioText showError={showError}>
              {option.text}
            </RadioText>
            <RadioInput
              {...props.input}
              type="radio"
              key={option.value}
              id={props.input.name}
              name={props.input.name}
              value={option.value}
              showError={showError}
              checked={option.text === props.input.value}
            />
          </RadioInputContainer>
        ))}
      </RadioContainer>
    </InputWrapper>
  );
};
const RadioContainer = styled.div`
  display: flex;
  width: 100%;
`;

const RadioInputContainer = styled.div`
  position: relative;
  margin: 0 1.8rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  &:last-child {
    margin-left: 1rem;
  }
  input[type=radio]:checked {
    background: #00bcd4;
    border-color: #00b4d0;
    transform: scale(1);
  }
`;

const RadioInput = styled.input`
  border-radius: 3px;
  border: solid 1px #babbbb;
  border-color: ${props => (props.showError ? '#d32f2f' : '')};
  padding: 18px;
  font-size: 16px;
  width: 100%;
  margin: 10px 1.2rem 1rem;
  position: relative;
  -webkit-appearance: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  transition: all 300ms ease-in-out;
  cursor: pointer;
    &:hover,
    &:active,
    &:focus {
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      border-color: ${props => (props.showError ? '#d32f2f' : '#00b4d0')};
      outline: none;
    }
`;

const RadioText = styled.div`
  position: relative;
  pointer-events: none;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.23;
  letter-spacing: 0.3px;

  color: ${props => (props.showError ? '#d32f2f' : 'rgba(0, 0, 0, 0.87)')};
`;

export default RadioField;

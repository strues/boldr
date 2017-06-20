import React from 'react';
import styled from 'styled-components';
import Radio from '@@components/Radio/Radio';
import RadioGroup from '@@components/Radio/RadioGroup';
import InputWrapper from '../InputWrapper';

const RadioField = props => {
  const { meta, ...rest } = props;
  const showError = meta.touched && meta.error && meta.invalid;

  return (
    <InputWrapper {...rest}>
      <RadioGroup {...props.input}>
        {props.options.map(option =>
          <Radio
            key={option.value}
            {...props.input}
            type="radio"
            id={props.input.name}
            name={props.input.name}
            value={option.value}
          />,
        )}
      </RadioGroup>
    </InputWrapper>
  );
};

export default RadioField;

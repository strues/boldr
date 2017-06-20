// @flow

import React from 'react';

import Select, { SelectTrigger } from '@@components/Select';
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

const { Option } = Select;

const SelectInput = (props: Props) => {
  const { meta } = props;
  const showError = meta.touched && meta.error && meta.invalid;

  handlePropsError(props.options);

  return (
    <InputWrapper {...props}>
      <Select
        {...props.input}
        id={props.input.text}
        name={props.input.text}
        showError={showError}
        visited={meta.visited}
      >
        {props.options.map(option => (
          <Option
            disabled={option.disabled}
            key={option.value}
            value={option.value}
          >
            {option.text}
          </Option>
        ))}
      </Select>
    </InputWrapper>
  );
};

export default SelectInput;

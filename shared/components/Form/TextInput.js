import React from 'react';
import TextField from 'react-md/lib/TextFields';

const TextInput = (props) => {
  const { input, label, placeholder, type, meta: { touched, error } } = props;
  return (
    <TextField
      { ...input }
      type={ type }
      label={ label }
      placeholder={ placeholder }
      error
      errorText={ meta.error }
    />
  );
};
export default TextInput;

import React, { PropTypes } from 'react';
import TextField from 'react-md/lib/TextFields';

const propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  rows: PropTypes.number,
  maxRows: PropTypes.number,
};

const InputField = (
  {
    input,
    label,
    type,
    rows,
    maxRows,
    meta: { touched, error },
  },
) => {
  return (
    <TextField
      { ...input }
      id={ input.name }
      label={ label }
      placeholder={ input.placeholder }
      type={ type }
      errorText={ error }
      rows={ rows }
      maxRows={ maxRows }
    />
  );
};

InputField.propTypes = propTypes;

export default InputField;

import React, { PropTypes } from 'react';
import { Form } from 'semantic-ui-react';

const TextField = ({ input, label, type }) => ( // eslint-disable-line
  <Form.Input
    label={ label }
    className="form__textfield"
    placeholder={ label }
    type={ type }
    { ...input }
  />
);

TextField.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default TextField;

import React, { PropTypes } from 'react';
import { Form } from 'semantic-ui-react';

const renderTextField = ({ input, type, label }) => (
    <Form.Input { ...input } type={ type } placeholder={ label } />
);

renderTextField.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default renderTextField;

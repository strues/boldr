export type Props = {
  input?: Object,
  type?: string,
  label?: string,
};

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

export default TextField;

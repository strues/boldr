// @flow
import React from 'react';

import { Errors, View, Collapse } from '../';

const FormField = ({
  name,
  label,
  error,
  touched,
  helpText,
  children,
}: {
  name?: string,
  label?: string,
  error?: string | Array<any>,
  touched?: boolean,
  helpText?: string,
  children?: any,
}) =>
  <View className="form-group" style={{ textAlign: 'left' }}>
    {label && <label htmlFor={name}>{label}</label>}
    {children}
    {helpText && <View className="help-block">{helpText}</View>}
    <Collapse isOpened={touched && !!error}>
      {touched && error && <Errors stackChildren>{error}</Errors>}
    </Collapse>
  </View>;

FormField.defaultProps = {
  touched: true,
  label: '',
  helpText: '',
  error: '',
  name: '',
};

export default FormField;

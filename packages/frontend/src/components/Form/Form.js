/* @flow */
import React from 'react';
import type { Node } from 'react';
import styled from 'styled-components';

export type Props = {
  children: Array<Node>,
  isInline: boolean,
  handleSubmit: () => void,
  className?: string,
};

export type MetaProps = {
  error?: string,
  warning?: string,
  touched?: boolean,
};

const FormElement = styled.form`display: ${props => (props.isInline ? 'inline-block' : 'block')};`;

const Form = (props: Props) => {
  const { handleSubmit, className } = props;

  return (
    <FormElement className={className} onSubmit={handleSubmit} {...props}>
      {props.children}
    </FormElement>
  );
};

Form.defaultProps = {
  isInline: false,
};

export default Form;

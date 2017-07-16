/* @flow */
import React from 'react';
import styled from 'styled-components';
import NavigationForm from '../NavigationForm';

export type Props = {
  onFormSubmit?: Function,
  initialValues?: {
    position?: number,
    link?: string,
    name?: string,
  },
};
const FormInner = styled.div`padding: 1em;`;
const NavigationEditor = (props: Props) => {
  return (
    <FormInner>
      <NavigationForm
        initialValues={props.initialValues}
        enableReinitialize
        onSubmit={props.onFormSubmit}
      />
    </FormInner>
  );
};

export default NavigationEditor;

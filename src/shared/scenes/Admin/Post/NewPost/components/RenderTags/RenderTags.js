/* eslint-disable react/prop-types */
import React from 'react';
import { TagsInput, FormGroup, Label } from 'boldr-ui';

const RenderTags = ({ input, label, meta: { touched, error, warning } }) => (
  <FormGroup color={`${touched && error ? 'danger' : ''}`}>
    <Label>{label}</Label>
    <div>
      <TagsInput
        value={input.value || []}
        onChange={input.onChange}
        state={`${touched && error ? 'danger' : ''}`}
        inputProps={{ placeholder: label }}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </FormGroup>
);

export default RenderTags;

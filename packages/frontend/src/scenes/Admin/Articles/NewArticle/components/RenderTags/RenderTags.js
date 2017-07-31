/* eslint-disable react/prop-types */
import React from 'react';
import TagsInput from 'react-tagsinput';
import { FormGroup } from '@boldr/ui/Form';

const RenderTags = ({ input, label, meta: { touched, error, warning } }) =>
  <FormGroup color={`${touched && error ? 'danger' : ''}`}>
    <TagsInput
      value={input.value || []}
      onChange={input.onChange}
      state={`${touched && error ? 'danger' : ''}`}
      inputProps={{ placeholder: label }}
    />
    {touched &&
      ((error &&
        <span>
          {error}
        </span>) ||
        (warning &&
          <span>
            {warning}
          </span>))}
  </FormGroup>;

export default RenderTags;

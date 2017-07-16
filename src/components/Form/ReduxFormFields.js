// @flow
import React from 'react';
import Checkbox from './Checkbox';
import Control from './Control';
import Help from './Help';
import FormField from './Field/FormField';
import Label from './Label';
import Radio from './Radio';
import Input from './Input';
import TextArea from './TextArea';
import Select from './Select';

export type ReduxFormFields = {
  id?: string | number,
  meta?: Object,
  input: Object,
  placeholder?: string,
  label?: string,
};

export type SelectOptType = {
  text: string,
  value: string | number,
};

export type SelectReduxFormField = {
  id?: string | number,
  meta?: Object,
  input: Object,
  label?: string,
  options: Array<SelectOptType>,
};

export const TextFormField = ({ id, meta, input, label, placeholder, ...rest }: ReduxFormFields) =>
  <FormField>
    <Label>
      {label}
    </Label>
    <Control>
      <Input id={id} placeholder={placeholder} {...input} {...rest} />
    </Control>
    {meta.touched &&
      meta.error &&
      <Help isColor="danger">
        {meta.error}
      </Help>}
  </FormField>;

export const TextAreaFormField = ({
  id,
  meta,
  input,
  label,
  placeholder,
  ...rest
}: ReduxFormFields) =>
  <FormField>
    <Label>
      {label}
    </Label>
    <Control>
      <TextArea id={id} placeholder={placeholder} {...input} {...rest} />
    </Control>
    {meta.touched &&
      meta.error &&
      <Help isColor="danger">
        {meta.error}
      </Help>}
  </FormField>;

export const SelectFormField = ({
  id,
  meta,
  input,
  label,
  options,
  ...rest
}: SelectReduxFormField) =>
  <FormField>
    <Label>
      {label}
    </Label>
    <Control>
      <Select id={id} {...input}>
        {(options || []).map(opt =>
          <option value={opt.value} key={opt.value}>
            {opt.text}
          </option>,
        )}
      </Select>
    </Control>
    {meta.touched &&
      meta.error &&
      <Help isColor="danger">
        {meta.error}
      </Help>}
  </FormField>;

export const CheckboxFormField = ({ id, meta, input, label, ...rest }: ReduxFormFields) =>
  <FormField>
    <Control>
      <Checkbox id={id} {...input} {...rest}>
        {label}
      </Checkbox>
    </Control>
  </FormField>;

export const RadioFormField = ({ id, meta, input, label, ...rest }: ReduxFormFields) =>
  <FormField>
    <Control>
      <Radio id={id} name={input.name} {...input}>
        {label}
      </Radio>
    </Control>
  </FormField>;

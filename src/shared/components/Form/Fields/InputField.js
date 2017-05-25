// @flow
import React from 'react';
import Input from '../../Input';
import Label from '../Label';
import Feedback from '../Feedback';

import type { MetaProps } from '../Form';

type Props = {
  input: any,
  placeholder: string,
  label: string,
  type: string,
  meta: MetaProps,
  addonBefore: ?any,
  addonAfter: ?any,
};

const InputField = ({
  input,
  addonBefore,
  placeholder,
  addonAfter,
  label,
  type,
  meta,
}: Props) => (
  <div>
    <Label label={label} />
    <div>
      <Input
        {...input}
        addonBefore={addonBefore}
        addonAfter={addonAfter}
        placeholder={placeholder}
        type={type}
      />
      {meta.touched && <Feedback meta={meta} />}
    </div>
  </div>
);

export default InputField;

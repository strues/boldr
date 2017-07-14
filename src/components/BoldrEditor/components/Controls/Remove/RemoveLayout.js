/* @flow */

import React from 'react';
import classNames from 'classnames';
import Icon from '@boldr/ui/Icons/Icon';
import Option from '../../Option';

export type Props = {
  config?: Object,
  onChange: Function,
};
const RemoveLayout = ({ config, onChange }: Props) => {
  const { icon, className, title } = config;
  return (
    <div className="boldrui-editor__remove-wrapper" aria-label="boldrui-editor__remove-control">
      <Option className={classNames(className)} onClick={onChange} title={title}>
        <Icon kind="eraser" color="#222" />
      </Option>
    </div>
  );
};

export default RemoveLayout;

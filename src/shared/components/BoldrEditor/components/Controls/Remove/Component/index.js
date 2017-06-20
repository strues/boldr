/* @flow */

import React from 'react';
import classNames from 'classnames';
import Icon from '@@components/Icons';
import Option from '../../../Option';

const RemoveComponent = ({ config, onChange }) => {
  const { icon, className, title } = config;
  return (
    <div className="boldr-editor__remove-wrapper" aria-label="boldr-editor__remove-control">
      <Option
        className={classNames(className)}
        onClick={onChange}
        title={title}
      >
        <Icon kind="eraser" color="#222" />
      </Option>
    </div>
  );
};

export default RemoveComponent;

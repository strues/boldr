/* @flow */

import React from 'react';
import classNames from 'classnames';
import { Bold, Italic, Underline, Strikethrough, Subscript, Superscript, Code } from '@boldr/icons';
import Option from '../../Option';

export type Props = {
  onChange?: Function,
  currentState?: Object,
};

const InlineLayout = (props: Props) => {
  const { currentState, onChange } = props;
  return (
    <div
      className={classNames('boldrui-editor__inline-wrapper')}
      aria-label="boldrui-editor__inline-control"
    >
      <Option value="bold" onClick={onChange} active={currentState.bold === true} title="bold">
        <Bold color="#222" />
      </Option>
      <Option
        value="italic"
        onClick={onChange}
        active={currentState.italic === true}
        title="Italic"
      >
        <Italic color="#222" />
      </Option>
      <Option
        value="underline"
        onClick={onChange}
        active={currentState.underline === true}
        title="Underline"
      >
        <Underline color="#222" />
      </Option>
      <Option
        value="strikethrough"
        onClick={onChange}
        active={currentState.strikethrough === true}
        title="Strikethrough"
      >
        <Strikethrough color="#222" />
      </Option>
      <Option
        value="superscript"
        onClick={onChange}
        active={currentState.superscript === true}
        title="Superscript"
      >
        <Superscript color="#222" />
      </Option>
      <Option
        value="subscript"
        onClick={onChange}
        active={currentState.subscript === true}
        title="Subscript"
      >
        <Subscript color="#222" />
      </Option>
      <Option value="code" onClick={onChange} active={currentState.CODE} title="Code">
        <Code color="#222" />
      </Option>
    </div>
  );
};

export default InlineLayout;

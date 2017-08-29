/* eslint-disable react/no-unused-prop-types */
/* @flow */

import React from 'react';
import { Bold, Italic, Underline, Strikethrough, Code } from '@boldr/icons';
import Option from '../../Option';
import { InlineWrapper } from './Inline.styled';

type CurrentState = {
  bold?: boolean,
  italic?: boolean,
  underline?: boolean,
  strikethrough?: boolean,
  superscript?: boolean,
  subscript?: boolean,
  CODE?: boolean,
};

export type Props = {
  onChange?: Function,
  currentState: CurrentState,
};

const InlineLayout = (props: Props) => {
  const { currentState, onChange } = props;
  return (
    <InlineWrapper aria-label="be-inline__control">
      <Option value="bold" onClick={onChange} active={currentState.bold === true} title="bold">
        <Bold color="#222" />
      </Option>
      <Option
        value="italic"
        onClick={onChange}
        active={currentState.italic === true}
        title="Italic">
        <Italic color="#222" />
      </Option>
      <Option
        value="underline"
        onClick={onChange}
        active={currentState.underline === true}
        title="Underline">
        <Underline color="#222" />
      </Option>
      <Option
        value="strikethrough"
        onClick={onChange}
        active={currentState.strikethrough === true}
        title="Strikethrough">
        <Strikethrough fill="#222" />
      </Option>

      <Option value="code" onClick={onChange} active={currentState.CODE} title="Code">
        <Code fill="#222" />
      </Option>
    </InlineWrapper>
  );
};

export default InlineLayout;

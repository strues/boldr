/* eslint-disable react/no-array-index-key, react/no-unused-prop-types, no-inline-comments */
/* @flow */
import * as React from 'react';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from '@boldr/icons';
import Option from '../../Option';
import { ControlWrapper } from '../Controls.styled';

export type Props = {
  onChange?: Function,
  currentState: Object,
};

const TextAlignLayout = (props: Props) => {
  const { onChange, currentState: { textAlignment } } = props;
  return (
    <ControlWrapper aria-label="be-textalign-control">
      <Option value="left" active={textAlignment === 'left'} onClick={onChange} title="Align Left">
        <AlignLeft color="#222" />
      </Option>
      <Option
        value="center"
        active={textAlignment === 'center'}
        onClick={onChange}
        title="Align Center"
      >
        <AlignCenter color="#222" />
      </Option>
      <Option
        value="right"
        active={textAlignment === 'right'}
        onClick={onChange}
        title="Align Right"
      >
        <AlignRight color="#222" />
      </Option>
      <Option
        value="justify"
        active={textAlignment === 'justify'}
        onClick={onChange}
        title="Justify"
      >
        <AlignJustify color="#222" />
      </Option>
    </ControlWrapper>
  );
};
export default TextAlignLayout;

/* eslint-disable react/no-array-index-key, react/no-unused-prop-types, no-inline-comments */
/* @flow */
import * as React from 'react';
import cn from 'classnames';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from '../../Icons';
import Option from '../../Option';

export type Props = {
  onChange?: Function,
  currentState: Object,
};

const TextAlignLayout = (props: Props) => {
  const { onChange, currentState: { textAlignment } } = props;
  return (
    <div className={cn('be-ctrl__group')} aria-label="be-textalign-control">
      <Option value="left" active={textAlignment === 'left'} onClick={onChange} title="Align Left">
        <AlignLeft size={20} fill="#222" />
      </Option>
      <Option
        value="center"
        active={textAlignment === 'center'}
        onClick={onChange}
        title="Align Center">
        <AlignCenter size={20} fill="#222" />
      </Option>
      <Option
        value="right"
        active={textAlignment === 'right'}
        onClick={onChange}
        title="Align Right">
        <AlignRight size={20} fill="#222" />
      </Option>
      <Option
        value="justify"
        active={textAlignment === 'justify'}
        onClick={onChange}
        title="Justify">
        <AlignJustify size={20} fill="#222" />
      </Option>
    </div>
  );
};
export default TextAlignLayout;

/* eslint-disable react/no-array-index-key, react/no-unused-prop-types, no-inline-comments */
/* @flow */
import * as React from 'react';
import cn from 'classnames';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from '@boldr/icons';
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
        <AlignLeft color="#222" />
      </Option>
      <Option
        value="center"
        active={textAlignment === 'center'}
        onClick={onChange}
        title="Align Center">
        <AlignCenter color="#222" />
      </Option>
      <Option
        value="right"
        active={textAlignment === 'right'}
        onClick={onChange}
        title="Align Right">
        <AlignRight color="#222" />
      </Option>
      <Option
        value="justify"
        active={textAlignment === 'justify'}
        onClick={onChange}
        title="Justify">
        <AlignJustify color="#222" />
      </Option>
    </div>
  );
};
export default TextAlignLayout;

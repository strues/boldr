/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from '@boldr/icons';
import Option from '../../Option';

export type Props = {
  onChange?: Function,
  currentState: Object,
};

export default class TextAlignLayout extends React.Component<Props, *> {
  props: Props;

  renderTextAlign(): Object {
    const { onChange, currentState: { textAlignment } } = this.props;
    return (
      <div
        className={classNames('boldr-editor-textalign__wrapper')}
        aria-label="boldr-editor-textalign-control"
      >
        <Option
          value="left"
          active={textAlignment === 'left'}
          onClick={onChange}
          title="Align Left"
        >
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
      </div>
    );
  }

  render(): Object {
    return this.renderTextAlign();
  }
}

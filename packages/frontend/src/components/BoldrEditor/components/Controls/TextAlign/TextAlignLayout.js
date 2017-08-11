/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';
// import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from '@boldr/icons';
import Icon from '@boldr/ui/Icons/Icon';
import Option from '../../Option';

export type Props = {
  config: Object,
  onChange?: Function,
  currentState: Object,
};

export default class TextAlignLayout extends Component {
  props: Props;

  renderTextAlign(): Object {
    const {
      config: { left, center, right, justify, className },
      onChange,
      currentState: { textAlignment },
    } = this.props;
    return (
      <div
        className={classNames('boldrui-editor__text-align-wrapper', className)}
        aria-label="boldrui-editor-textalign-control"
      >
        <Option
          value="left"
          className={classNames(left.className)}
          active={textAlignment === 'left'}
          onClick={onChange}
          title={left.title}
        >
          <Icon kind="align-left" color="#222" size="1em" />
        </Option>
        <Option
          value="center"
          className={classNames(center.className)}
          active={textAlignment === 'center'}
          onClick={onChange}
          title={center.title}
        >
          <Icon kind="align-center" color="#222" size="1em" />
        </Option>
        <Option
          value="right"
          className={classNames(right.className)}
          active={textAlignment === 'right'}
          onClick={onChange}
          title={right.title}
        >
          <Icon kind="align-right" color="#222" size="1em" />
        </Option>
        <Option
          value="justify"
          className={classNames(justify.className)}
          active={textAlignment === 'justify'}
          onClick={onChange}
          title={justify.title}
        >
          <Icon kind="justify" color="#222" size="1em" />
        </Option>
      </div>
    );
  }

  render(): Object {
    // if (inDropdown) {
    //   return this.renderInDropDown();
    // }
    return this.renderTextAlign();
  }
}

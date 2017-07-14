/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '@boldr/ui/Icons/Icon';
import Option from '../../Option';
import { Dropdown, DropdownOption } from '../../Dropdown';
import { getFirstIcon } from '../../../utils/toolbar';

export type Props = {
  expanded?: boolean,
  doExpand?: Function,
  doCollapse?: Function,
  onExpandEvent?: Function,
  config?: Object,
  onChange?: Function,
  currentState?: Object,
};

export default class TextAlignLayout extends Component {
  props: Props;
  renderInFlatList(): Object {
    const {
      config: { options, left, center, right, justify, className },
      onChange,
      currentState: { textAlignment },
    } = this.props;
    return (
      <div
        className={classNames('boldrui-editor__text-align-wrapper', className)}
        aria-label="boldrui-editor-textalign-control"
      >
        {options.indexOf('left') >= 0 &&
          <Option
            value="left"
            className={classNames(left.className)}
            active={textAlignment === 'left'}
            onClick={onChange}
            title={left.title}
          >
            <Icon kind="align-left" color="#222" />
          </Option>}
        {options.indexOf('center') >= 0 &&
          <Option
            value="center"
            className={classNames(center.className)}
            active={textAlignment === 'center'}
            onClick={onChange}
            title={center.title}
          >
            <Icon kind="align-center" color="#222" />
          </Option>}
        {options.indexOf('right') >= 0 &&
          <Option
            value="right"
            className={classNames(right.className)}
            active={textAlignment === 'right'}
            onClick={onChange}
            title={right.title}
          >
            <Icon kind="align-right" color="#222" />
          </Option>}
        {options.indexOf('justify') >= 0 &&
          <Option
            value="justify"
            className={classNames(justify.className)}
            active={textAlignment === 'justify'}
            onClick={onChange}
            title={justify.title}
          >
            <Icon kind="justify" color="#222" />
          </Option>}
      </div>
    );
  }

  renderInDropDown(): Object {
    const {
      config,
      expanded,
      doExpand,
      onExpandEvent,
      doCollapse,
      currentState: { textAlignment },
      onChange,
    } = this.props;
    const { options, left, center, right, justify, className, dropdownClassName, title } = config;
    return (
      <Dropdown
        className={classNames('boldrui-editor__text-align-dropdown', className)}
        optionWrapperClassName={classNames(dropdownClassName)}
        onChange={onChange}
        expanded={expanded}
        doExpand={doExpand}
        doCollapse={doCollapse}
        onExpandEvent={onExpandEvent}
        aria-label="rdw-textalign-control"
        title={title}
      >
        <Icon kind="align-left" color="#222" />
        {options.indexOf('left') >= 0 &&
          <DropdownOption
            value="left"
            active={textAlignment === 'left'}
            className={classNames('boldrui-editor__text-align-dropdownOption', left.className)}
            title={left.title}
          >
            <Icon kind="align-left" color="#222" />
          </DropdownOption>}
        {options.indexOf('center') >= 0 &&
          <DropdownOption
            value="center"
            active={textAlignment === 'center'}
            className={classNames('boldrui-editor__text-align-dropdownOption', center.className)}
            title={center.title}
          >
            <Icon kind="align-center" color="#222" />
          </DropdownOption>}
        {options.indexOf('right') >= 0 &&
          <DropdownOption
            value="right"
            active={textAlignment === 'right'}
            className={classNames('boldrui-editor__text-align-dropdownOption', right.className)}
            title={right.title}
          >
            <Icon kind="align-right" color="#222" />
          </DropdownOption>}
        {options.indexOf('justify') >= 0 &&
          <DropdownOption
            value="justify"
            active={textAlignment === 'justify'}
            className={classNames('boldrui-editor__text-align-dropdownOption', justify.className)}
            title={justify.title}
          >
            <Icon kind="justify" color="#222" />
          </DropdownOption>}
      </Dropdown>
    );
  }

  render(): Object {
    const { config: { inDropdown } } = this.props;
    if (inDropdown) {
      return this.renderInDropDown();
    }
    return this.renderInFlatList();
  }
}

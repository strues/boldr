/* eslint-disable react/no-array-index-key, react/no-unused-prop-types, no-inline-comments */
/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';
import { Dropdown, DropdownOption } from '../../Dropdown';
import { ControlWrapper } from '../Controls.styled';

type CurrentFontState = {
  fontSize: number,
};

export type Props = {
  expanded: boolean,
  onExpandEvent?: Function,
  doExpand?: Function,
  doCollapse?: Function,
  onChange?: Function,
  config: Object,
  currentState: CurrentFontState,
};
type State = {
  defaultFontSize: string,
};

export default class FontSizeLayout extends Component<Props, State> {
  state: State = {
    defaultFontSize: undefined,
  };

  componentDidMount(): void {
    const editorElm = document.getElementsByClassName('DraftEditor-root');
    if (editorElm && editorElm.length > 0) {
      const styles = window.getComputedStyle(editorElm[0]);
      let defaultFontSize = styles.getPropertyValue('font-size');
      defaultFontSize = defaultFontSize.substring(0, defaultFontSize.length - 2);
      this.setDefaultFontSize(defaultFontSize);
    }
  }

  setDefaultFontSize = defaultFontSize => {
    this.setState({
      defaultFontSize,
    });
  };

  props: Props;
  render() {
    const {
      config: { icon, dropdownClassName, options, title },
      onChange,
      expanded,
      doCollapse,
      onExpandEvent,
      doExpand,
    } = this.props;
    let { currentState: { fontSize: currentFontSize } } = this.props;
    let { defaultFontSize } = this.state;
    defaultFontSize = Number(defaultFontSize);
    currentFontSize =
      currentFontSize || (options && options.indexOf(defaultFontSize) >= 0 && defaultFontSize);

    return (
      <ControlWrapper aria-label="be-fontsize-control">
        {/* // $FlowIssue */}
        <Dropdown
          optionWrapperClassName={classNames(dropdownClassName)}
          onChange={onChange}
          expanded={expanded}
          doExpand={doExpand}
          doCollapse={doCollapse}
          onExpandEvent={onExpandEvent}
          isSkinny
          title={title}
        >
          {currentFontSize
            ? <span>
                {currentFontSize}
              </span>
            : <img src={icon} alt="" />}
          {options.map((size, index) =>
            <DropdownOption
              className="be-fontsize__option"
              active={currentFontSize === size}
              value={size}
              disabled={false}
              highlighted={false}
              key={index}
            >
              {size}
            </DropdownOption>,
          )}
        </Dropdown>
      </ControlWrapper>
    );
  }
}

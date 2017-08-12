/* @flow weak */

import React, { Component } from 'react';
import classNames from 'classnames';
import shortid from 'shortid';
import { Dropdown, DropdownOption } from '../../Dropdown';

export type Props = {
  expanded: boolean,
  onExpandEvent: ?Function,
  doExpand: ?Function,
  doCollapse: ?Function,
  onChange: ?Function,
  config: Object,
  currentState: Object,
};

export default class FontSizeLayout extends Component {
  state: Object = {
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
      config: { icon, className, dropdownClassName, options, title },
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
      <div className="boldredit-fontsize__wrapper" aria-label="boldredit-fontsize-control">
        <Dropdown
          className={classNames('boldredit-fontsize__dropdown', className)}
          optionWrapperClassName={classNames(dropdownClassName)}
          onChange={onChange}
          expanded={expanded}
          doExpand={doExpand}
          doCollapse={doCollapse}
          onExpandEvent={onExpandEvent}
          title={title}
        >
          {currentFontSize
            ? <span>
                {currentFontSize}
              </span>
            : <img src={icon} alt="" />}
          {options.map(size =>
            <DropdownOption
              className="boldredit-fontsize__option"
              active={currentFontSize === size}
              value={size}
              key={shortid.generate()}
            >
              {size}
            </DropdownOption>,
          )}
        </Dropdown>
      </div>
    );
  }
}

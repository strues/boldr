/* @flow weak */

import React, { Component } from 'react';
import classNames from 'classnames';
import shortid from 'shortid';
import { Dropdown, DropdownOption } from '../../Dropdown';

export type Props = {
  expanded: ?boolean,
  onExpandEvent: ?Function,
  doExpand: ?Function,
  doCollapse: ?Function,
  onChange: ?Function,
  config: Object,
  currentState: Object,
};

class FontFamilyLayout extends Component {
  state: Object = {
    defaultFontFamily: undefined,
  };

  componentDidMount(): void {
    const editorElm = document.getElementsByClassName('DraftEditor-root');
    if (editorElm && editorElm.length > 0) {
      const styles = window.getComputedStyle(editorElm[0]);
      const defaultFontFamily = styles.getPropertyValue('font-family');
      this.setDefaultFam(defaultFontFamily);
    }
  }
  setDefaultFam = defaultFont => {
    this.setState({
      defaultFontFamily: defaultFont,
    });
  };
  props: Props;
  render() {
    const { defaultFontFamily } = this.state;
    const {
      config: { className, dropdownClassName, options, title },
      onChange,
      expanded,
      doCollapse,
      onExpandEvent,
      doExpand,
    } = this.props;
    let { currentState: { fontFamily: currentFontFamily } } = this.props;
    currentFontFamily =
      currentFontFamily ||
      (options &&
        defaultFontFamily &&
        options.some(opt => opt.toLowerCase() === defaultFontFamily.toLowerCase()) &&
        defaultFontFamily);
    return (
      <div className="boldredit-fontfam__wrapper" aria-label="boldredit-fontfamily-control">
        <Dropdown
          className={classNames('boldredit-fontfam__dropdown', className)}
          optionWrapperClassName={classNames('boldredit-fontfam__optionwrapper', dropdownClassName)}
          onChange={onChange}
          expanded={expanded}
          doExpand={doExpand}
          ariaLabel="boldredit-dropdown-control"
          doCollapse={doCollapse}
          onExpandEvent={onExpandEvent}
          title={title}
        >
          <span className="boldredit-fontfam__placeholder">
            {currentFontFamily || 'Font Family'}
          </span>
          {options.map(family =>
            <DropdownOption
              active={currentFontFamily === family}
              value={family}
              key={shortid.generate()}
            >
              {family}
            </DropdownOption>,
          )}
        </Dropdown>
      </div>
    );
  }
}

export default FontFamilyLayout;

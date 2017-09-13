/* eslint-disable react/no-array-index-key */
/* @flow */

import React from 'react';
import type { Node } from 'react';
import cn from 'classnames';
import { Dropdown, DropdownOption } from '../../Dropdown';
import type { FontFamilyConfig } from '../../../core/config';

export type Props = {
  expanded: boolean,
  onExpandEvent: Function,
  doExpand: Function,
  doCollapse: Function,
  onChange: Function,
  config: FontFamilyConfig,
  currentState: any,
};

type State = {
  defaultFontFamily: string,
};

class FontFamilyLayout extends React.Component<Props, State> {
  state = {
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
  render(): Node {
    const { defaultFontFamily } = this.state;
    const {
      config: { options, title },
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
      <div className={cn('be-ctrl__group')} aria-label="be-fontfamily-control">
        <Dropdown
          onChange={onChange}
          expanded={expanded}
          doExpand={doExpand}
          ariaLabel="be-dropdown-fontfamily-control"
          doCollapse={doCollapse}
          onExpandEvent={onExpandEvent}
          title={title}>
          <span className={cn('be-fontfamily__ph')}>{currentFontFamily || 'Font Family'}</span>
          {options.map((family, index) => (
            <DropdownOption active={currentFontFamily === family} value={family} key={index}>
              {family}
            </DropdownOption>
          ))}
        </Dropdown>
      </div>
    );
  }
}

export default FontFamilyLayout;

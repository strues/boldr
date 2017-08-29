/* eslint-disable react/no-array-index-key */
/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { Dropdown, DropdownOption } from '../../Dropdown';
import { ControlWrapper } from '../Controls.styled';
import type { FontFamilyConfig } from '../../../core/config';

export type Props = {
  expanded: boolean,
  onExpandEvent?: Function,
  doExpand?: Function,
  doCollapse?: Function,
  onChange?: Function,
  config: FontFamilyConfig,
  currentState: any,
};

type State = {
  defaultFontFamily: string,
};

const FamilyPlaceholder = styled.span`
  overflow: hidden;
  max-width: 90px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
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
  render() {
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
      <ControlWrapper aria-label="be-fontfamily-control">
        <Dropdown
          onChange={onChange}
          expanded={expanded}
          doExpand={doExpand}
          ariaLabel="be-dropdown-control"
          doCollapse={doCollapse}
          onExpandEvent={onExpandEvent}
          title={title}>
          <FamilyPlaceholder>
            {currentFontFamily || 'Font Family'}
          </FamilyPlaceholder>
          {options.map((family, index) =>
            <DropdownOption active={currentFontFamily === family} value={family} key={index}>
              {family}
            </DropdownOption>,
          )}
        </Dropdown>
      </ControlWrapper>
    );
  }
}

export default FontFamilyLayout;

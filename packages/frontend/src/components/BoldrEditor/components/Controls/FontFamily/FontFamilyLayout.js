/* @flow weak */

import * as React from 'react';
import classNames from 'classnames';
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
      <div
        className="boldr-editor-fontfamily__wrapper"
        aria-label="boldr-editor-fontfamily-control"
      >
        <Dropdown
          className={classNames('boldr-editor-fontfamily__dropdown', className)}
          optionWrapperClassName={classNames(
            'boldr-editor-fontfam__optionwrapper',
            dropdownClassName,
          )}
          onChange={onChange}
          expanded={expanded}
          doExpand={doExpand}
          ariaLabel="boldr-editor-dropdown-control"
          doCollapse={doCollapse}
          onExpandEvent={onExpandEvent}
          title={title}
        >
          <span className="boldr-editor-fontfamily__placeholder">
            {currentFontFamily || 'Font Family'}
          </span>
          {options.map((family, index) =>
            <DropdownOption active={currentFontFamily === family} value={family} key={index}>
              {family}
            </DropdownOption>,
          )}
        </Dropdown>
      </div>
    );
  }
}

export default FontFamilyLayout;

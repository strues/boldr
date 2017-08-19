/* eslint-disable react/prefer-stateless-function, react/no-array-index-key, no-return-assign, no-unused-expressions */
// @flow
import React, { Component } from 'react';
import cN from 'classnames';
// $FlowIssue
import { Modifier, EditorState, RichUtils } from 'draft-js';
import uniqueId from 'lodash/uniqueId';
import Dropdown from '../Dropdown';
import ColorPicker from '../ColorPicker';
import type { OptionColors } from '../../core/configs/options';

type Props = {
  editorState: EditorState,
  onChange: Function,
  selection: any,
  currentInlineStyle: Object,
  colors: OptionColors,
  language: Object,
};
type State = {
  colorType: string,
};

export default class TextColor extends Component<Props, State> {
  state = {
    colorType: 'color',
  };

  dropDown = {};
  dropDownId = `BE-DROPDOWN-${uniqueId()}`;
  switchColorType = e => {
    this.setState({
      colorType: e.target.dataset.type,
    });
  };
  props: Props;
  toggleColor = color => {
    const prefix = this.state.colorType === 'color' ? 'COLOR-' : 'BGCOLOR-';
    const toggledColor = prefix + color;
    const { editorState, selection, currentInlineStyle, colors } = this.props;
    const nextContentState = colors.reduce((contentState, item) => {
      return Modifier.removeInlineStyle(contentState, selection, prefix + item.replace('#', ''));
    }, editorState.getCurrentContent());

    let nextEditorState = EditorState.push(editorState, nextContentState, 'change-inline-style');

    if (selection.isCollapsed()) {
      nextEditorState = currentInlineStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }

    if (!currentInlineStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, toggledColor);
    }

    this.props.onChange(nextEditorState);
    this.dropDown.hide();
  };
  render() {
    const captionStyle = {};
    let currentIndex = null;
    const { colorType } = this.state;
    const { currentInlineStyle, language, colors } = this.props;

    colors.forEach((color, index) => {
      const colorId = color.replace('#', '');

      if (currentInlineStyle.has(`COLOR-${colorId}`)) {
        captionStyle.color = color;
        colorType === 'color' && (currentIndex = index);
      }

      if (currentInlineStyle.has(`BGCOLOR-${colorId}`)) {
        captionStyle.backgroundColor = color;
        colorType === 'backgroundColor' && (currentIndex = index);
      }
    });

    const caption = (
      <i style={captionStyle} className="icon-text-color">
        <span className="path1" />
        <span className="path2" />
      </i>
    );

    return (
      <Dropdown
        caption={caption}
        hoverTitle={language.controls.color}
        showDropDownArrow={false}
        componentId={this.dropDownId}
        ref={instance => (this.dropDown = instance)}
        className={cN('be-toolbar__item', 'be-dropdown', 'be-text-color__dropdown')}
      >
        <div className="be-text-colorpicker__wrap">
          <div className="be-switch__buttons">
            <button
              data-type="color"
              data-keep-active
              data-be-component-id={this.dropDownId}
              className={colorType === 'color' ? 'active' : ''}
              onClick={this.switchColorType}
            >
              {language.controls.textColor}
            </button>
            <button
              data-type="backgroundColor"
              data-keep-active
              data-be-component-id={this.dropDownId}
              className={colorType === 'backgroundColor' ? 'active' : ''}
              onClick={this.switchColorType}
            >
              {language.controls.backgroundColor}
            </button>
          </div>
          <ColorPicker
            width={200}
            current={currentIndex}
            disableAlpha
            colors={colors}
            onChange={this.toggleColor}
          />
        </div>
      </Dropdown>
    );
  }
}
